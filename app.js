const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes'); 
const actorRoutes = require('./routes/actorRoutes'); 
const directorRoutes = require('./routes/directorRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const customListRoutes = require('./routes/customListRoutes');
const searchRoutes = require('./routes/searchRoutes');
const cron = require('node-cron');
const upcomingController = require('./controllers/upcomingController');
const upcomingRoutes = require('./routes/upcomingRoutes');
const newsRoutes = require('./routes/newsRoutes'); 
const boxOfficeRoutes = require('./routes/boxOfficeRoutes');
const awardRoutes = require('./routes/awardRoutes');
const communityRoutes = require('./routes/communityRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { updateSiteStatistics } = require('./controllers/adminController');

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes); 
app.use('/api/actors', actorRoutes);
app.use('/api/directors', directorRoutes); 
app.use('/api/reviews', reviewRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/custom-lists', customListRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/upcoming', upcomingRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/boxoffice', boxOfficeRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/admin', adminRoutes);

cron.schedule('0 10 * * *', async () => {
  console.log('Checking for upcoming movie reminders...');
  await upcomingController.sendUpcomingMovieNotifications();
});
cron.schedule('0 0 * * *', async () => {
  try {
    await updateSiteStatistics();
    console.log('Site statistics updated successfully.');
  } catch (error) {
    console.error('Error updating site statistics:', error);
  }
});
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
