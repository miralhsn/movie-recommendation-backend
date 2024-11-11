const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    genres: [String],
    actors: [String]
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  reviews: [{ movieId: mongoose.Schema.Types.ObjectId, review: String, rating: Number }],
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomList' }]
});

module.exports = mongoose.model('User', userSchema);
