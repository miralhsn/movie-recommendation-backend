// controllers/ratingController.js
const Rating = require('../models/rating');
const Movie = require('../models/Movie'); // Assuming Movie model is present

// Rate a movie (1-5)
exports.rateMovie = async (req, res) => {
  const { movieId, rating } = req.body;
  const userId = req.userId; // Assuming userId is available from JWT token

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    // Check if the user has already rated this movie
    const existingRating = await Rating.findOne({ movieId, userId });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.status(200).json({ message: 'Rating updated successfully' });
    }

    // Add a new rating
    const newRating = new Rating({ movieId, userId, rating });
    await newRating.save();

    res.status(201).json({ message: 'Rating added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
