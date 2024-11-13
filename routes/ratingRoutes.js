// routes/ratingRoutes.js
const express = require('express');
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Rate a movie (1-5)
router.post('/rate', authMiddleware, ratingController.rateMovie);

module.exports = router;
