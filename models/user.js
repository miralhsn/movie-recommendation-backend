const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    genres: [String],
    actors: [String],
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

module.exports = mongoose.model('User', userSchema);
