const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwtConfig = require('../config/jwt');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, jwtConfig.secret, jwtConfig.options);
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtConfig.secret, jwtConfig.options);
    
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

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

exports.addToWishlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.userId; 

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: movieId } }, 
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie to wishlist' });
  }
};
