import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortId: { type: String, unique: true, required: true },
  password: { type: String },
  isProtected: { type: Boolean, default: false },
  isOneTime: { type: Boolean, default: false },
  isUsed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Url", urlSchema);
