const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwtConfig = require('../config/jwt');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, jwtConfig.secret, jwtConfig.options);
    
    // Send the token in response
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user and return JWT token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, jwtConfig.secret, jwtConfig.options);
    
    // Send the token in response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile (preferences and wishlist)
exports.updateProfile = async (req, res) => {
  const { genres, actors } = req.body;
  const userId = req.userId; // Assuming that JWT auth middleware populates req.userId

  try {
    // Find user and update preferences
    const user = await User.findByIdAndUpdate(
      userId,
      { preferences: { genres, actors } },
      { new: true }
    );
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Add movie to wishlist
exports.addToWishlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.userId; // Assuming that JWT auth middleware populates req.userId

  try {
    // Add movieId to the user's wishlist
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: movieId } }, // Use $addToSet to avoid duplicates
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie to wishlist' });
  }
};
