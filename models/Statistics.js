const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  mostPopularMovies: [{ movieId: mongoose.Schema.Types.ObjectId, views: Number }],
  trendingGenres: [{ genre: String, count: Number }],
  mostSearchedActors: [{ actor: String, count: Number }],
  userEngagement: {
    totalUsers: Number,
    activeUsers: Number,
    totalReviews: Number,
    totalComments: Number,
    averageRating: Number
  }
}, { timestamps: true });

const Statistics = mongoose.model('Statistics', statisticsSchema);
module.exports = Statistics;
