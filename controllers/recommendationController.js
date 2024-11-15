const Movie = require('../models/movie');
const Review = require('../models/review');
const User = require('../models/user');

// Helper function to get unique elements
const getUniqueArray = (arr) => [...new Set(arr)];

// Personalized Recommendations for Home Page
exports.getRecommendations = async (req, res) => {
  const userId = req.userId; // Get user ID from the auth middleware

  try {
    // Fetch user info and reviews
    const user = await User.findById(userId);
    const userReviews = await Review.find({ userId });

    console.log('User Reviews:', userReviews); // Debugging: Check if reviews exist

    // Extract favorite genres from user's past ratings
    const favoriteGenres = [];
    for (let review of userReviews) {
      const movie = await Movie.findById(review.movieId);
      if (movie) {
        console.log('Movie Genre:', movie.genre); // Debugging: Check if movie genres are valid
        favoriteGenres.push(movie.genre);
      }
    }

    // Get unique genres and filter out null values
    const uniqueGenres = getUniqueArray(favoriteGenres).filter(Boolean);
    console.log('Unique Genres:', uniqueGenres); // Debugging: Check unique genres

    // Recommend movies based on favorite genres
    const recommendedMovies = await Movie.find({ genre: { $in: uniqueGenres } }).limit(10);

    console.log('Recommended Movies:', recommendedMovies); // Debugging: Check recommended movies

    res.status(200).json({ recommendedMovies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
};


// Similar Titles for a Movie Page
exports.getSimilarTitles = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Fetch similar movies by genre, director, or popularity
    const similarMovies = await Movie.find({
      $or: [
        { genre: movie.genre },
        { director: movie.director },
        { popularity: { $gte: movie.popularity * 0.8 } } // Similar in popularity
      ],
      _id: { $ne: movieId } // Exclude the current movie
    }).limit(5);

    res.status(200).json({ similarMovies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching similar titles' });
  }
};

// Trending and Top Rated Movies
exports.getTrendingAndTopRatedMovies = async (req, res) => {
  try {
    // Trending movies: most reviews in the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const trendingMovies = await Movie.aggregate([
      { $lookup: { from: 'reviews', localField: '_id', foreignField: 'movieId', as: 'reviews' } },
      { $project: { title: 1, reviewCount: { $size: '$reviews' }, reviews: 1 } },
      { $match: { 'reviews.date': { $gte: oneWeekAgo } } },
      { $sort: { reviewCount: -1 } },
      { $limit: 5 }
    ]);

    // Top rated movies: average rating of reviews
    const topRatedMovies = await Review.aggregate([
      { $group: { _id: '$movieId', averageRating: { $avg: '$rating' } } },
      { $sort: { averageRating: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'movies', localField: '_id', foreignField: '_id', as: 'movie' } },
      { $unwind: '$movie' }
    ]);

    res.status(200).json({
      trendingMovies,
      topRatedMovies: topRatedMovies.map(item => item.movie)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending and top-rated movies' });
  }
};
