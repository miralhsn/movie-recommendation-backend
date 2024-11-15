const express = require('express');
const router = express.Router();
const BoxOffice = require('../models/boxOffice');

// Route to add box office information
router.post('/add', async (req, res) => {
  try {
    const boxOffice = new BoxOffice(req.body);
    await boxOffice.save();
    res.status(201).json({ message: 'Box Office information added successfully', boxOffice });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add Box Office information', error });
  }
});

// Route to get box office information for a specific movie
router.get('/:movieId', async (req, res) => {
  try {
    const boxOffice = await BoxOffice.findOne({ movieId: req.params.movieId });
    if (!boxOffice) return res.status(404).json({ message: 'Box Office information not found' });
    res.status(200).json(boxOffice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Box Office information', error });
  }
});

module.exports = router;
