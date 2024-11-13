// controllers/reviewController.js
const Review = require('../models/review');

// Write or update a review
exports.writeReview = async (req, res) => {
  const { movieId, reviewText } = req.body;
  const userId = req.userId; // Assuming userId is available from JWT token

  try {
    // Check if the user has already written a review for this movie
    const existingReview = await Review.findOne({ movieId, userId });
    if (existingReview) {
      existingReview.reviewText = reviewText;
      await existingReview.save();
      return res.status(200).json({ message: 'Review updated successfully' });
    }

    // Add a new review
    const newReview = new Review({ movieId, userId, reviewText });
    await newReview.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all reviews for a specific movie
exports.getReviews = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movieId }).populate('userId', 'username'); // Populate user info
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get review highlights (top-rated and most discussed)
exports.getReviewHighlights = async (req, res) => {
  try {
    // Top-rated reviews (filtering the highest ratings)
    const topRatedReviews = await Review.aggregate([
      { $group: { _id: '$movieId', avgRating: { $avg: '$rating' } } },
      { $sort: { avgRating: -1 } },
      { $limit: 5 } // Top 5 movies with highest average rating
    ]);

    // Most-discussed reviews (count reviews by movieId)
    const mostDiscussedReviews = await Review.aggregate([
      { $group: { _id: '$movieId', reviewCount: { $sum: 1 } } },
      { $sort: { reviewCount: -1 } },
      { $limit: 5 } // Top 5 movies with most reviews
    ]);

    res.status(200).json({
      topRatedReviews,
      mostDiscussedReviews
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
