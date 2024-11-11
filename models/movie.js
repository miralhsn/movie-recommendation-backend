const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  cast: [String],
  releaseDate: Date,
  runtime: Number,
  synopsis: String,
  averageRating: { type: Number, default: 0 },
  coverPhoto: String,
  trivia: String,
  goofs: String,
  soundtrack: String,
  ageRating: String,
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }],
  reviews: [{ userId: mongoose.Schema.Types.ObjectId, review: String }]
});

module.exports = mongoose.model('Movie', movieSchema);
