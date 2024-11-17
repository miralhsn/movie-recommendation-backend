// Import Mongoose
const mongoose = require('mongoose');

// Define the Statistics Schema
const statisticsSchema = new mongoose.Schema(
  {
    mostPopularMovies: [{ movieId: mongoose.Schema.Types.ObjectId, views: Number }],
    trendingGenres: [{ genre: String, count: Number }],
    mostSearchedActors: [{ actor: String, count: Number }],
    userEngagement: {
      totalUsers: Number,
      activeUsers: Number,
      totalReviews: Number,
      totalComments: Number,
      averageRating: Number,
    },
  },
  { timestamps: true }
);

// Create the Statistics model
const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
