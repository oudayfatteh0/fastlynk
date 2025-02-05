import express from 'express';
import { nanoid } from 'nanoid'
import Url from "../models/Url.js";
import bcrypt from 'bcrypt';

const router = express.Router();

// generate short url
router.post("/shorten", async (req, res) => {
  const { longUrl, password, isOneTime } = req.body;
  if (!longUrl || !longUrl.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortId = nanoid(6);
  
  const urlData = { 
    longUrl, 
    shortId,
    isOneTime: !!isOneTime
  };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    urlData.password = hashedPassword;
    urlData.isProtected = true;
  }

  await Url.create(urlData);
  res.json({ shortId, isProtected: !!password, isOneTime: !!isOneTime });
});

// check if url is password protected or handle redirect
router.get("/:shortId", async (req, res) => {
  const url = await Url.findOne({ shortId: req.params.shortId });
  if (!url) return res.status(404).json({ error: "Not found" });

  if (url.isUsed && url.isOneTime) {
    return res.status(410).json({ error: "This link has already been used" });
  }

  if (url.isProtected) {
    return res.json({ isProtected: true, isOneTime: url.isOneTime });
  }

  if (url.isOneTime) {
    await Url.findByIdAndUpdate(url._id, { isUsed: true });
  }

  res.json(url.longUrl);
});

// verify password and get URL
router.post("/:shortId/access", async (req, res) => {
  const { password } = req.body;
  const url = await Url.findOne({ shortId: req.params.shortId });
  
  if (!url) return res.status(404).json({ error: "Not found" });
  
  if (url.isUsed && url.isOneTime) {
    return res.status(410).json({ error: "This link has already been used" });
  }

  if (!url.isProtected) {
    if (url.isOneTime) {
      await Url.findByIdAndUpdate(url._id, { isUsed: true });
    }
    return res.json(url.longUrl);
  }

  const isValidPassword = await bcrypt.compare(password, url.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  if (url.isOneTime) {
    await Url.findByIdAndUpdate(url._id, { isUsed: true });
  }

  res.json(url.longUrl);
});

export default router;
