const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortId: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Url", urlSchema);
