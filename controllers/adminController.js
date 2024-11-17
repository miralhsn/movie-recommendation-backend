const Movie = require('../models/movie');
const Review = require('../models/review');
const Statistics = require('../models/Statistics');
const mongoose = require('mongoose');

// Add or Update Movie
exports.addOrUpdateMovie = async (req, res) => {
  try {
    const { title, genre, director, releaseDate, synopsis, coverPhoto, rating } = req.body;
    const movie = await Movie.findOneAndUpdate(
      { title },
      { title, genre, director, releaseDate, synopsis, coverPhoto, rating },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Movie added/updated successfully', movie });
  } catch (error) {
    res.status(500).json({ message: 'Error adding/updating movie', error });
  }
};

// Moderate Review
exports.moderateReview = async (req, res) => {
  const { reviewId, action } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

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
// View Site Statistics
exports.getSiteStatistics = async (req, res) => {
  try {
    // Attempt to find the statistics in the database
    const statistics = await Statistics.findOne();

    // Check if the statistics document is found
    if (!statistics) {
      // If no data is found, return a friendly response with default or empty values
      return res.status(200).json({
        message: 'No statistics data available at the moment',
        statistics: {
          mostPopularMovies: [],
          trendingGenres: [],
          mostSearchedActors: [],
          userEngagement: {
            totalUsers: 0,
            activeUsers: 0,
            totalReviews: 0,
            totalComments: 0,
            averageRating: 0,
          },
        },
      });
    }

    // If data is found, return the statistics
    res.status(200).json({ statistics });
  } catch (error) {
    // Handle any errors that occur during the query
    res.status(500).json({ message: 'Error fetching site statistics', error });
  }
};


// Update Site Statistics
exports.updateSiteStatistics = async () => {
  try {
    console.log('updateSiteStatistics called'); 
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
      totalUsers: 1000,
      activeUsers: 900,
      totalReviews: await Review.countDocuments(),
      totalComments: 500,
      averageRating: 8.5
    };

    const statistics = new Statistics({
      mostPopularMovies,
      trendingGenres,
      mostSearchedActors,
      userEngagement
    });

    await statistics.save();
    res.status(200).json({ message: 'Statistics updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating statistics', error });
  }
};
