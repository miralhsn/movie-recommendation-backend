const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');
const swagger = require('./swagger/swagger');

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
swagger(app);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running');
});
