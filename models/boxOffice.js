const mongoose = require('mongoose');

const boxOfficeSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  openingWeekendEarnings: { type: Number, required: true }, // in USD
  totalEarnings: { type: Number, required: true }, // in USD
  internationalRevenue: { type: Number, required: true } // in USD
}, { timestamps: true });

const BoxOffice = mongoose.model('BoxOffice', boxOfficeSchema);
module.exports = BoxOffice;
