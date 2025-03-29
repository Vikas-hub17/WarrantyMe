require('dotenv').config();  // ✅ Load environment variables first
const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Load Passport config after env variables
require("./config/passport"); 

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/delete-letter", async (req, res) => {
    const { content } = req.body;
  
    try {
      // Find and delete the file in Google Drive (implement Drive API logic here)
      // Example: Use `drive.files.delete({ fileId })` if you store file IDs.
      
      res.status(200).json({ success: true, message: "Letter deleted successfully." });
    } catch (error) {
      console.error("Google Drive deletion error:", error);
      res.status(500).json({ success: false, message: "Failed to delete letter." });
    }
  });
  

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/drive", require("./routes/driveRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
