// /routes/search.js
const express = require("express");
const router = express.Router();
const songsData = require("../data/songsData");

router.get("/", (req, res) => {
  const query = req.query.query?.toLowerCase();

  if (!query) {
    return res.status(200).json(songsData);
  }

  const filteredSongs = songsData.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.subtitle.toLowerCase().includes(query)
  );

  res.status(200).json(filteredSongs);
});

module.exports = router;
