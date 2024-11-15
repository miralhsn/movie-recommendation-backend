const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: [String], required: true },
  director: { type: String, required: true },
  cast: [{ name: String, role: String }],
  releaseDate: { type: Date, required: true },
  runtime: { type: Number, required: true }, // In minutes
  synopsis: { type: String },
  averageRating: { type: Number, min: 0, max: 10 },
  coverPhoto: { type: String }, // URL of the movie cover photo
  trivia: [{ type: String }], // List of trivia facts
  goofs: [{ type: String }], // List of errors or goofs
  soundtrack: [{ title: String, artist: String }], // List of soundtrack information
  ageRating: { type: String }, // e.g., "PG-13", "R", etc.
  parentalGuidance: { type: String }, // Description for parents
  popularity: { type: Number, default: 0 },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
