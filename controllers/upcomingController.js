const Movie = require('../models/movie');
const Reminder = require('../models/reminder');
const User = require('../models/user');
const nodemailer = require('nodemailer');

exports.getUpcomingReleases = async (req, res) => {
  try {
    const upcomingMovies = await Movie.find({ releaseDate: { $gte: new Date() } }).sort({ releaseDate: 1 });
    res.status(200).json({ upcomingMovies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming movies' });
  }
};

// Get Upcoming Movies (Release Date in the future)
exports.getUpcomingMovies = async (req, res) => {
    try {
      // Fetch upcoming movie data here (from database, API, etc.)
      const upcomingMovies = await Movie.find({ releaseDate: { $gte: new Date() } }).sort({ releaseDate: 1 });
  
      res.status(200).json({ upcomingMovies });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching upcoming movies' });
    }
  };
  

// Set a Reminder for a Movie Release or Trailer
exports.setReminder = async (req, res) => {
  const { userId, movieId, reminderDate } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const reminder = new Reminder({
      userId,
      movieId,
      reminderDate: new Date(reminderDate), // Convert string to Date
    });

    await reminder.save();
    return res.status(200).json({ message: 'Reminder set successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error setting reminder' });
  }
};

// Send Notification for Upcoming Movie Releases or Trailers
exports.sendUpcomingMovieNotifications = async () => {
  const reminders = await Reminder.find({ reminderDate: { $lte: new Date() }, notificationSent: false });

  // Initialize email transporter (using nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@example.com',  // Your email
      pass: 'your-email-password',      // Your email password
    },
  });

  // Send email notifications to users who have reminders
  for (const reminder of reminders) {
    const user = await User.findById(reminder.userId);
    const movie = await Movie.findById(reminder.movieId);

    const mailOptions = {
      from: 'your-email@example.com',
      to: user.email,
      subject: `Reminder: ${movie.title} is releasing soon!`,
      text: `The movie "${movie.title}" is releasing soon on ${movie.releaseDate}. Don't miss it!`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
        // Update the reminder to indicate the notification has been sent
        reminder.notificationSent = true;
        await reminder.save();
      }
    });
  }
};
