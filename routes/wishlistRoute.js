// Example route to add a movie to wishlist
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Movie = require('../models/movie');
const User = require('../models/user');

router.put('/wishlist', authMiddleware, async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  try {
    const user = await User.findById(req.userId);  // Assuming you're storing the user's ID in the JWT payload
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.wishlist.includes(movieId)) {
      return res.status(400).json({ message: 'Movie is already in the wishlist' });
    }

    user.wishlist.push(movieId);
    await user.save();

    return res.status(200).json({ message: 'Movie added to wishlist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding movie to wishlist' });
  }
});

module.exports = router;
