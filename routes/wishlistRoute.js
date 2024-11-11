const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Movie = require('../models/movie');
const User = require('../models/user');

// Route to add a movie to the wishlist
router.put('/wishlist', authMiddleware, async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  try {
    // Find the user based on the JWT token
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the movie is already in the wishlist
    if (user.wishlist.includes(movieId)) {
      return res.status(400).json({ message: 'Movie is already in the wishlist' });
    }

    // Add the movie to the wishlist
    user.wishlist.push(movieId);
    await user.save();

    return res.status(200).json({ message: 'Movie added to wishlist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding movie to wishlist' });
  }
});

module.exports = router;
