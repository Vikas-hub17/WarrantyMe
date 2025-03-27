const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

// Save Letter to Google Drive
exports.uploadLetter = async (req, res) => {
  try {
    const { letterTitle, letterContent } = req.body;
    const filePath = path.join(__dirname, `${letterTitle}.txt`);

    // Save letter locally before uploading
    fs.writeFileSync(filePath, letterContent);

    const response = await drive.files.create({
      requestBody: {
        name: `${letterTitle}.txt`,
        mimeType: "text/plain",
      },
      media: {
        mimeType: "text/plain",
        body: fs.createReadStream(filePath),
      },
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Letter uploaded successfully", fileId: response.data.id });
  } catch (error) {
    console.error("Error uploading letter:", error);
    res.status(500).json({ error: "Failed to upload letter" });
  }
};

// Retrieve User's Letters from Google Drive
exports.getLetters = async (req, res) => {
  try {
    const response = await drive.files.list({
      q: "mimeType='text/plain'",
      fields: "files(id, name, webViewLink)",
    });

    res.status(200).json(response.data.files);
  } catch (error) {
    console.error("Error fetching letters:", error);
    res.status(500).json({ error: "Failed to retrieve letters" });
  }
};
