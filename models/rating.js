// models/Rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 to 5
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
