module.exports = {
  secret: process.env.JWT_SECRET || 'your-jwt-secret',
  options: {
    expiresIn: '1h', 
  },
};
