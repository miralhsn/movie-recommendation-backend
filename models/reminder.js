const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  reminderDate: { type: Date, required: true },  // Date and time when the reminder should be triggered
  notificationSent: { type: Boolean, default: false },  // Whether the notification has been sent
});

module.exports = mongoose.model('Reminder', reminderSchema);
