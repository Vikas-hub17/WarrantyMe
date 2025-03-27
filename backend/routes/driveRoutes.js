const express = require("express");
const { uploadLetter, getLetters } = require("../controllers/driveController");

const router = express.Router();

router.post("/upload", uploadLetter);
router.get("/letters", getLetters);

module.exports = router;
