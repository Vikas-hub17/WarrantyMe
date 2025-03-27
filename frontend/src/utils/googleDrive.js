export async function saveToGoogleDrive(content) {
    try {
      const response = await fetch("http://localhost:5000/api/saveLetter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
  
      const data = await response.json();
      if (data.success) {
        console.log("Saved successfully");
      }
    } catch (error) {
      console.error("Error saving letter:", error);
    }
  }
  
  export async function fetchLettersFromDrive() {
    try {
      const response = await fetch("http://localhost:5000/api/getLetters");
      const data = await response.json();
      return data.letters || [];
    } catch (error) {
      console.error("Error fetching letters:", error);
      return [];
    }
  }
  