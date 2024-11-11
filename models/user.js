const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  preferences: {
    genres: [String],
    actors: [String],
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;