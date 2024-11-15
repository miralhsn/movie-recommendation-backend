const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Route to create a new post
router.post('/create', communityController.createPost);

// Route to get all posts
router.get('/all', communityController.getAllPosts);

// Route to add a comment to a post
router.post('/:postId/comment', communityController.addComment);

module.exports = router;
