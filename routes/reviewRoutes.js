// routes/reviewRoutes.js
const express = require('express');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Write or update a review
router.post('/review', authMiddleware, reviewController.writeReview);

// Get all reviews for a movie
router.get('/reviews/:movieId', reviewController.getReviews);

// Get review highlights
router.get('/review-highlights', reviewController.getReviewHighlights);

module.exports = router;
