const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const router = express.Router();

// POST /shorten - Generate short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl || !longUrl.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortId = nanoid(6);
  await Url.create({ longUrl, shortId });

  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
});

// GET /{shortened_id} - Redirect to original URL
router.get("/:shortId", async (req, res) => {
  const url = await Url.findOne({ shortId: req.params.shortId });
  if (!url) return res.status(404).json({ error: "Not found" });

  res.redirect(url.longUrl);
});

module.exports = router;
