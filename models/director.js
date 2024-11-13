const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  filmography: {
    type: [String], // Array of movie titles
    required: true
  },
  awards: [
    {
      title: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: true
      }
    }
  ],
  photos: [String] // Array of photo URLs
});

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;
