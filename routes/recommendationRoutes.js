const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');

// Personalized Recommendations for Home Page
router.get('/recommendations', authMiddleware, recommendationController.getRecommendations);

// Similar Titles for a Movie Page
router.get('/similar-titles/:movieId', recommendationController.getSimilarTitles);

// Trending and Top Rated Movies
router.get('/trending-top-rated', recommendationController.getTrendingAndTopRatedMovies);

router.get('/recommendations', (req, res) => {
  console.log('Recommendations route hit');
  res.send('Recommendations route is working');
});

module.exports = router;
