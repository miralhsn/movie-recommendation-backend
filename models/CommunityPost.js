const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
  author: { type: String, required: true }, // User's name or ID
  title: { type: String, required: true },
  content: { type: String, required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, // Reference to a movie
  genre: { type: String }, // Genre of the discussion (optional)
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      commenter: { type: String, required: true },
      commentText: { type: String, required: true },
      commentedAt: { type: Date, default: Date.now }
    }
  ]
});

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);
module.exports = CommunityPost;
