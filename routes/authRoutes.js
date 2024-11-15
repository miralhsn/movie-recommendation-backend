const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Register new user
router.post('/register', authController.register);

// Login user and get JWT token
router.post('/login', authController.login);

// Update user profile (preferences and wishlist)
router.put('/profile', authMiddleware, authController.updateProfile);

// Add movie to wishlist
router.put('/wishlist', authMiddleware, authController.addToWishlist);

module.exports = router;
