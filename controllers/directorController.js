const Director = require('../models/director');

// Add a new director
exports.addDirector = async (req, res) => {
  try {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json({ message: 'Director added successfully', director });
  } catch (error) {
    res.status(400).json({ message: 'Error adding director', error });
  }
};

// Update a director
exports.updateDirector = async (req, res) => {
  try {
    const { directorId } = req.params;
    const updatedDirector = await Director.findByIdAndUpdate(directorId, req.body, { new: true });
    if (!updatedDirector) return res.status(404).json({ message: 'Director not found' });
    res.json({ message: 'Director updated successfully', updatedDirector });
  } catch (error) {
    res.status(400).json({ message: 'Error updating director', error });
  }
};

// Delete a director
exports.deleteDirector = async (req, res) => {
  try {
    const { directorId } = req.params;
    const deletedDirector = await Director.findByIdAndDelete(directorId);
    if (!deletedDirector) return res.status(404).json({ message: 'Director not found' });
    res.json({ message: 'Director deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting director', error });
  }
};

// Get a director by ID
exports.getDirectorById = async (req, res) => {
  try {
    const { directorId } = req.params;
    const director = await Director.findById(directorId);
    if (!director) return res.status(404).json({ message: 'Director not found' });
    res.json(director);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching director details', error });
  }
};

// List all directors
exports.listDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching directors', error });
  }
};
