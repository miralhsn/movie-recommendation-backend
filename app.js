const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes'); // New
const actorRoutes = require('./routes/actorRoutes'); // New
const directorRoutes = require('./routes/directorRoutes'); // New
const reviewRoutes = require('./routes/reviewRoutes'); // Ensure correct path
const recommendationRoutes = require('./routes/recommendationRoutes');

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes); // New
app.use('/api/actors', actorRoutes); // New
app.use('/api/directors', directorRoutes); 
app.use('/api/reviews', reviewRoutes);  // Mount the review routes
app.use('/api/recommendations', recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
