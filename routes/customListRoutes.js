// routes/customListRoutes.js
const express = require('express');
const router = express.Router();
const customListController = require('../controllers/customListController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a Custom List
router.post('/create', authMiddleware, customListController.createCustomList);

// Get all Custom Lists
router.get('/', customListController.getAllCustomLists);

// Get a specific Custom List
router.get('/:customListId', customListController.getCustomListById);

// Follow a Custom List
router.post('/follow/:customListId', authMiddleware, customListController.followCustomList);

// Add movies to a Custom List
router.post('/add-movies/:customListId', authMiddleware, customListController.addMoviesToList);

module.exports = router;
