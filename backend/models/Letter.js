import mongoose from "mongoose";

const letterSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  googleDriveId: { type: String },
}, { timestamps: true });

export default mongoose.model("Letter", letterSchema);
