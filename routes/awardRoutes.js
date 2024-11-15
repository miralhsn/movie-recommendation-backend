const express = require('express');
const router = express.Router();
const Award = require('../models/award');

// Route to add an award
router.post('/add', async (req, res) => {
  try {
    const award = new Award(req.body);
    await award.save();
    res.status(201).json({ message: 'Award added successfully', award });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add award', error });
  }
});

// Route to get awards for a specific movie
router.get('/:movieId', async (req, res) => {
  try {
    const awards = await Award.find({ movieId: req.params.movieId });
    if (!awards.length) return res.status(404).json({ message: 'No awards found for this movie' });
    res.status(200).json(awards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching awards', error });
  }
});

module.exports = router;
