const Actor = require('../models/actor');

// Add a new actor
exports.addActor = async (req, res) => {
  try {
    const actor = new Actor(req.body);
    await actor.save();
    res.status(201).json({ message: 'Actor added successfully', actor });
  } catch (error) {
    res.status(400).json({ message: 'Error adding actor', error });
  }
};

// Update an actor
exports.updateActor = async (req, res) => {
  try {
    const { actorId } = req.params;
    const updatedActor = await Actor.findByIdAndUpdate(actorId, req.body, { new: true });
    if (!updatedActor) return res.status(404).json({ message: 'Actor not found' });
    res.json({ message: 'Actor updated successfully', updatedActor });
  } catch (error) {
    res.status(400).json({ message: 'Error updating actor', error });
  }
};

// Delete an actor
exports.deleteActor = async (req, res) => {
  try {
    const { actorId } = req.params;
    const deletedActor = await Actor.findByIdAndDelete(actorId);
    if (!deletedActor) return res.status(404).json({ message: 'Actor not found' });
    res.json({ message: 'Actor deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting actor', error });
  }
};

// Get an actor by ID
exports.getActorById = async (req, res) => {
  try {
    const { actorId } = req.params;
    const actor = await Actor.findById(actorId);
    if (!actor) return res.status(404).json({ message: 'Actor not found' });
    res.json(actor);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching actor details', error });
  }
};

// List all actors
exports.listActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching actors', error });
  }
};
