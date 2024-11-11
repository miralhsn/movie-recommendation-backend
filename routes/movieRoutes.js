const express = require('express');
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/movies', authMiddleware, movieController.createMovie);
// Other routes like update, delete, get movies...
module.exports = router;
