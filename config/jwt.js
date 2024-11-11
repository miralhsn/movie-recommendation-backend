module.exports = {
    secret: process.env.JWT_SECRET || 'fallback-secret-key', // Use the secret from the .env file
    options: {
      expiresIn: '1h', 
    },
  };
  