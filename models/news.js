const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  source: { type: String }, // Optional: source of the news article
  publishedDate: { type: Date, default: Date.now },
  tags: [String], // Array of tags related to the article
});

module.exports = mongoose.model('News', newsSchema);
