const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/', movieController.addMovie);
router.put('/:movieId', movieController.updateMovie);
router.delete('/:movieId', movieController.deleteMovie);
router.get('/:movieId', movieController.getMovieById);
router.get('/', movieController.listMovies);

module.exports = router;
