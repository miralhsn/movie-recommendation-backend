// controllers/customListController.js
const CustomList = require('../models/customList');
const Movie = require('../models/movie');
const User = require('../models/user');

// Create a Custom List
exports.createCustomList = async (req, res) => {
  const { title, description, movieIds } = req.body;
  const userId = req.userId;

  try {
    const movies = await Movie.find({ '_id': { $in: movieIds } });

    const customList = new CustomList({
      title,
      description,
      movies: movies.map(movie => movie._id),
      user: userId,
      followers: [],
    });

    await customList.save();
    res.status(201).json({ message: 'Custom list created successfully', customList });
  } catch (error) {
    res.status(500).json({ message: 'Error creating custom list' });
  }
};

// Get all Custom Lists
exports.getAllCustomLists = async (req, res) => {
  try {
    const customLists = await CustomList.find().populate('movies').populate('user', 'name');
    res.status(200).json(customLists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching custom lists' });
  }
};

// Get a specific Custom List
exports.getCustomListById = async (req, res) => {
  const { customListId } = req.params;
  try {
    const customList = await CustomList.findById(customListId).populate('movies').populate('user', 'name');
    if (!customList) return res.status(404).json({ message: 'Custom list not found' });
    res.status(200).json(customList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching custom list' });
  }
};

// Follow a Custom List
exports.followCustomList = async (req, res) => {
  const { customListId } = req.params;
  const userId = req.userId;

  try {
    const customList = await CustomList.findById(customListId);
    if (!customList) return res.status(404).json({ message: 'Custom list not found' });

    // If user already follows the list, no need to add again
    if (customList.followers.includes(userId)) {
      return res.status(400).json({ message: 'You are already following this list' });
    }

    customList.followers.push(userId);
    await customList.save();

    res.status(200).json({ message: 'Successfully followed the list', customList });
  } catch (error) {
    res.status(500).json({ message: 'Error following custom list' });
  }
};

// Add movies to a Custom List
exports.addMoviesToList = async (req, res) => {
  const { customListId } = req.params;
  const { movieIds } = req.body;

  try {
    const customList = await CustomList.findById(customListId);
    if (!customList) return res.status(404).json({ message: 'Custom list not found' });

    const movies = await Movie.find({ '_id': { $in: movieIds } });
    customList.movies.push(...movies.map(movie => movie._id));
    await customList.save();

    res.status(200).json({ message: 'Movies added to the list successfully', customList });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movies to custom list' });
  }
};
