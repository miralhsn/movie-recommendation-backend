const mongoose = require('mongoose');

const movie = await Movie.findById(movieId);
if (!movie) {
  return res.status(404).json({ message: 'Movie not found' });
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String },
  year: { type: Number },
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

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;