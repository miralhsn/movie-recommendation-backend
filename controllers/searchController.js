// controllers/searchController.js
const Movie = require('../models/movie');

// Helper function to get movies by filter criteria
const applyFilters = (query, filters) => {
  if (filters.rating) {
    query = query.where('rating').gte(filters.rating);
  }
  if (filters.popularity) {
    query = query.where('popularity').gte(filters.popularity);
  }
  if (filters.releaseYear) {
    query = query.where('releaseYear').gte(filters.releaseYear);
  }
  if (filters.releaseDecade) {
    const startYear = filters.releaseDecade * 10;
    query = query.where('releaseYear').gte(startYear).lt(startYear + 10);
  }
  if (filters.country) {
    query = query.where('country').equals(filters.country);
  }
  if (filters.language) {
    query = query.where('language').equals(filters.language);
  }
  if (filters.keywords && filters.keywords.length > 0) {
    query = query.where('keywords').in(filters.keywords);
  }
  return query;
};

// Search for movies by title, genre, director, or actors
exports.searchMovies = async (req, res) => {
    const { query, filters } = req.body;
  
    // Initialize the query object
    let searchQuery = {};
  
    // Apply search based on the 'query' (title, genre, director)
    if (query) {
      searchQuery = {
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
          { genre: { $regex: query, $options: 'i' } }, // Case-insensitive search for genre
          { director: { $regex: query, $options: 'i' } }, // Case-insensitive search for director
        ]
      };
    }
  
    // Apply filters if provided (rating, popularity, releaseYear)
    if (filters) {
      if (filters.rating) {
        searchQuery.rating = { $gte: filters.rating };
      }
      if (filters.popularity) {
        searchQuery.popularity = { $gte: filters.popularity };
      }
      if (filters.releaseYear) {
        searchQuery.releaseYear = { $gte: filters.releaseYear };
      }
    }
  
    try {
      const movies = await Movie.find(searchQuery);
      if (movies.length > 0) {
        return res.status(200).json({ movies });
      } else {
        return res.status(200).json({ message: 'No movies found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching movies' });
    }
  };
  
// Get top movies of the month (e.g., most popular or highly rated)
exports.getTopMoviesOfTheMonth = async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  try {
    const topMovies = await Movie.find({
      releaseDate: { $gte: startOfMonth },
    })
      .sort({ popularity: -1 }) // Sorting by popularity or ratings
      .limit(10);
    
    res.status(200).json({ topMovies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top movies of the month' });
  }
};

// Get top 10 movies by genre
exports.getTopMoviesByGenre = async (req, res) => {
  const { genre } = req.params;

  try {
    const topMovies = await Movie.find({ genre: { $in: [genre] } })
      .sort({ rating: -1 }) // Sorting by highest rating
      .limit(10);
    
    res.status(200).json({ topMovies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top movies by genre' });
  }
};
