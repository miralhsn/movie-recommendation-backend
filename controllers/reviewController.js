const Review = require('../models/review');
const Movie = require('../models/movie');

// Add or Update Review
exports.addOrUpdateReview = async (req, res) => {
  const { movieId, reviewText, rating } = req.body;
  const userId = req.userId; // From the authMiddleware (authenticated user)

  try {
    let review = await Review.findOne({ movieId, userId });

    if (review) {
      // Update review
      review.reviewText = reviewText;
      review.rating = rating;
      await review.save();
      return res.status(200).json({ message: 'Review updated successfully', review });
    } else {
      // Add new review
      review = new Review({ movieId, userId, reviewText, rating });
      await review.save();
      return res.status(201).json({ message: 'Review added successfully', review });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding or updating review' });
    console.log(error);
  }
};

// Get Reviews for a Movie
exports.getReviewsForMovie = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const reviews = await Review.find({ movieId }).populate('userId', 'username');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

// Get Review Highlights (Top-rated and Most-discussed)
exports.getReviewHighlights = async (req, res) => {
  try {
    const topRatedReviews = await Review.find()
      .sort({ rating: -1 })
      .limit(5) // Top 5 rated reviews
      .populate('movieId', 'title')
      .populate('userId', 'username');

    const mostDiscussedReviews = await Movie.aggregate([
      { $lookup: { from: 'reviews', localField: '_id', foreignField: 'movieId', as: 'reviews' } },
      { $project: { title: 1, reviewCount: { $size: '$reviews' } } },
      { $sort: { reviewCount: -1 } },
      { $limit: 5 } // Most discussed movies
    ]);

    res.status(200).json({
      topRatedReviews,
      mostDiscussedReviews
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review highlights' });
  }
};
