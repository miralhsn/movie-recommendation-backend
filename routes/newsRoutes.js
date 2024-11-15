const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Get all news articles
router.get('/', newsController.getAllNews);

// Get a specific news article by ID
router.get('/:id', newsController.getNewsById);

// Add a new news article
router.post('/', newsController.addNewsArticle);

// Update a news article
router.put('/:id', newsController.updateNewsArticle);

// Delete a news article
router.delete('/:id', newsController.deleteNewsArticle);

module.exports = router;
