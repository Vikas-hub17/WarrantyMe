import { gapi } from "gapi-script";


export const getAccessToken = async () => {
  const authInstance = gapi.auth2.getAuthInstance();
  if (!authInstance.isSignedIn.get()) {
    await authInstance.signIn();
  }
  return authInstance.currentUser.get().getAuthResponse().access_token;
};

export const saveToGoogleDrive = async (content) => {
  try {
    const accessToken = await getAccessToken(); // Ensure we have a valid token

    if (!accessToken) {
      throw new Error("No access token found. Please sign in again.");
    }

    const metadata = {
      name: "Letter.txt",
      mimeType: "text/plain",
    };

    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", new Blob([content], { type: "text/plain" }));

    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
      body: form,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error.message);
    
    return result;
  } catch (error) {
    console.error("Google Drive Save Error:", error);
    throw error;
  }
};

export const fetchLettersFromDrive = async () => {
  try {
    const response = await gapi.client.drive.files.list({
      q: "mimeType='text/plain'",
      fields: "files(id, name)",
    });

    const files = response.result.files || [];
    const letters = await Promise.all(
      files.map(async (file) => {
        const fileContent = await gapi.client.drive.files.get({
          fileId: file.id,
          alt: "media",
        });
        return { id: file.id, name: file.name, content: fileContent.body };
      })
    );

    return letters;
  } catch (error) {
    console.error("Error fetching letters from Google Drive:", error);
    throw error;
  }
};

export const deleteLetterFromDrive = async (letterName, accessToken) => {
  console.log("Attempting to delete letter:", letterName);

  try {
    // Step 1: Get file ID from Google Drive
    const searchResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(letterName)}'`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`Failed to search for letter: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();
    console.log("Drive API search response:", searchData);

    if (!searchData.files || searchData.files.length === 0) {
      throw new Error("Letter not found in Google Drive.");
    }

    const fileId = searchData.files[0].id;

    // Step 2: Delete the file
    const deleteResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete letter: ${deleteResponse.statusText}`);
    }

    console.log("Letter deleted successfully from Google Drive.");
    return true;
  } catch (error) {
    console.error("Error deleting letter from Google Drive:", error);
    return false;
  }
};
