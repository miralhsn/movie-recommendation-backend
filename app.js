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
const customListRoutes = require('./routes/customListRoutes');
const searchRoutes = require('./routes/searchRoutes');
const cron = require('node-cron');
const upcomingController = require('./controllers/upcomingController');
const upcomingRoutes = require('./routes/upcomingRoutes');
const newsRoutes = require('./routes/newsRoutes'); 
const boxOfficeRoutes = require('./routes/boxOfficeRoutes');
const awardRoutes = require('./routes/awardRoutes');

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
app.use('/api/custom-lists', customListRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/upcoming', upcomingRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/boxoffice', boxOfficeRoutes);
app.use('/api/awards', awardRoutes);

cron.schedule('0 10 * * *', async () => {
  console.log('Checking for upcoming movie reminders...');
  await upcomingController.sendUpcomingMovieNotifications();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
