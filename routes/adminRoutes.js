const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to add or update a movie
router.post('/movie', adminController.addOrUpdateMovie);

// Route to moderate a review (approve or delete)
router.post('/review/moderate', adminController.moderateReview);

// Route to get site statistics
router.get('/statistics', adminController.getSiteStatistics);

// Route to update site statistics (this could be a periodic task or triggered by an event)
router.post('/statistics/update', adminController.updateSiteStatistics);

module.exports = router;
