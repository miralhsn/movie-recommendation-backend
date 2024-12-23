const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(403).json({ message: 'Authorization required' });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.userId = decoded.userId; // Attach the user ID to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
