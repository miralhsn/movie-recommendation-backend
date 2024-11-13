const Movie = require('../models/movie');

// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    res.status(400).json({ message: 'Error adding movie', error });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie updated successfully', updatedMovie });
  } catch (error) {
    res.status(400).json({ message: 'Error updating movie', error });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting movie', error });
  }
};

// Get a movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching movie details', error });
  }
};

// List all movies
exports.listMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching movies', error });
  }
};
