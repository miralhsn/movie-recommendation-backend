const News = require('../models/news');

// Get all news articles
exports.getAllNews = async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ publishedDate: -1 });
    res.status(200).json({ newsArticles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news articles' });
  }
};

// Get a specific news article by ID
exports.getNewsById = async (req, res) => {
  try {
    const newsArticle = await News.findById(req.params.id);
    if (!newsArticle) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.status(200).json({ newsArticle });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news article' });
  }
};

// Add a new news article
exports.addNewsArticle = async (req, res) => {
  const { title, content, author, source, tags } = req.body;
  try {
    const newArticle = new News({
      title,
      content,
      author,
      source,
      tags,
    });
    await newArticle.save();
    res.status(201).json({ message: 'News article added successfully', newArticle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding news article' });
  }
};

// Update a news article
exports.updateNewsArticle = async (req, res) => {
  const { title, content, author, source, tags } = req.body;
  try {
    const updatedArticle = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, author, source, tags },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.status(200).json({ message: 'News article updated successfully', updatedArticle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating news article' });
  }
};

// Delete a news article
exports.deleteNewsArticle = async (req, res) => {
  try {
    const deletedArticle = await News.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.status(200).json({ message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting news article' });
  }
};
