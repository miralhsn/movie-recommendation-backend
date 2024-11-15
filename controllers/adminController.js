const Movie = require('../models/movie');
const Review = require('../models/review');
const Statistics = require('../models/Statistics');

// Add or Update Movie
exports.addOrUpdateMovie = async (req, res) => {
  try {
    const { title, genre, director, releaseDate, synopsis, coverPhoto, rating } = req.body;
    const movie = await Movie.findOneAndUpdate(
      { title }, // Update the movie by title
      { title, genre, director, releaseDate, synopsis, coverPhoto, rating },
      { new: true, upsert: true } // Create if not found
    );
    res.status(200).json({ message: 'Movie added/updated successfully', movie });
  } catch (error) {
    res.status(500).json({ message: 'Error adding/updating movie', error });
  }
};

// Moderate Review
exports.moderateReview = async (req, res) => {
  const { reviewId, action } = req.body;  // action can be 'approve' or 'delete'
  
  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (action === 'approve') {
      review.moderated = true;
      await review.save();
      res.status(200).json({ message: 'Review approved', review });
    } else if (action === 'delete') {
      await review.remove();
      res.status(200).json({ message: 'Review deleted' });
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error moderating review', error });
  }
};

// View Site Statistics
exports.getSiteStatistics = async (req, res) => {
  try {
    const statistics = await Statistics.findOne();
    if (!statistics) return res.status(404).json({ message: 'No statistics found' });
    res.status(200).json({ statistics });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching site statistics', error });
  }
};

// Update Site Statistics (This will be called periodically or when an action occurs)
exports.updateSiteStatistics = async () => {
  // Example to populate some statistics (this should be triggered periodically)
  const mostPopularMovies = await Movie.aggregate([
    { $project: { title: 1, views: 1 } },
    { $sort: { views: -1 } },
    { $limit: 10 }
  ]);
  
  const trendingGenres = await Movie.aggregate([
    { $unwind: '$genre' },
    { $group: { _id: '$genre', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const mostSearchedActors = await Review.aggregate([
    { $lookup: { from: 'movies', localField: 'movieId', foreignField: '_id', as: 'movie' } },
    { $unwind: '$movie' },
    { $unwind: '$movie.actors' },
    { $group: { _id: '$movie.actors', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const userEngagement = {
    totalUsers: 1000, // Example, calculate from User model
    activeUsers: 900, // Example, calculate active users
    totalReviews: await Review.countDocuments(),
    totalComments: 500, // Example, calculate from Comment model
    averageRating: 8.5 // Example, calculate average from reviews
  };

  const statistics = new Statistics({
    mostPopularMovies,
    trendingGenres,
    mostSearchedActors,
    userEngagement
  });

  await statistics.save();
  console.log("Site statistics updated.");
};
