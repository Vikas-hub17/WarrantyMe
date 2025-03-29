import express from "express";
import { saveLetter, getLetters } from "../controllers/letterController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/save", protect, saveLetter);
router.get("/all", protect, getLetters);

export default router;
