import Letter from "../models/Letter.js";
import { uploadToGoogleDrive } from "../services/googleDriveService.js";

export const saveLetter = async (req, res) => {
  try {
    const { title, content } = req.body;
    const googleDriveId = await uploadToGoogleDrive(title, content);

    const letter = await Letter.create({ userId: req.user.id, title, content, googleDriveId });
    res.json(letter);
  } catch (error) {
    res.status(500).json({ message: "Failed to save letter" });
  }
};

export const getLetters = async (req, res) => {
  const letters = await Letter.find({ userId: req.user.id });
  res.json(letters);
};
