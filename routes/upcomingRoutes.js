// upcomingRoutes.js
const express = require('express');
const router = express.Router();
const upcomingController = require('../controllers/upcomingController');

// Use the correct function from the controller
router.get('/upcoming', upcomingController.getUpcomingMovies);

// Other routes
router.post('/reminder', upcomingController.setReminder);
router.post('/send-notifications', async (req, res) => {
  await upcomingController.sendUpcomingMovieNotifications();
  res.status(200).json({ message: 'Notifications sent successfully' });
});

module.exports = router;
