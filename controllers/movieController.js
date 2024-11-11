const Movie = require('../models/movie');

exports.createMovie = async (req, res) => {
  const { title, genre, director, cast, releaseDate, runtime, synopsis } = req.body;
  try {
    const newMovie = new Movie({ title, genre, director, cast, releaseDate, runtime, synopsis });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Other methods for updating, deleting, fetching movies...
