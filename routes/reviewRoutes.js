const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middleware/authMiddleware'); // Import authenticateToken

// Add or Update Review
router.post('/review', authenticateToken, reviewController.addOrUpdateReview);

// Get Reviews for a Movie
router.get('/reviews/:movieId', reviewController.getReviewsForMovie);

// Get Review Highlights (Top-rated and Most-discussed)
router.get('/review-highlights', reviewController.getReviewHighlights);

module.exports = router;
