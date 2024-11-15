const CommunityPost = require('../models/CommunityPost');

// Create a new discussion post
exports.createPost = async (req, res) => {
  try {
    const post = new CommunityPost(req.body);
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create post', error });
  }
};

// Get all discussion posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().populate('movieId');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = {
      commenter: req.body.commenter,
      commentText: req.body.commentText
    };
    const post = await CommunityPost.findById(postId);
    post.comments.push(comment);
    await post.save();
    res.status(201).json({ message: 'Comment added successfully', post });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add comment', error });
  }
};
