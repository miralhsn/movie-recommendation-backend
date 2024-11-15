// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Search Movies (by title, genre, director, or actors)
router.post('/search', searchController.searchMovies);

// Top Movies of the Month
router.get('/top-movies-month', searchController.getTopMoviesOfTheMonth);

// Top Movies by Genre (e.g., Top 10 Action Movies)
router.get('/top-movies-genre/:genre', searchController.getTopMoviesByGenre);

module.exports = router;
