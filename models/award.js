const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  awardName: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  winner: { type: Boolean, default: false } // true if the movie or actor won
}, { timestamps: true });

const Award = mongoose.model('Award', awardSchema);
module.exports = Award;
