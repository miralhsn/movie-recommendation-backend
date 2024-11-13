const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String, required: true },
  birthDate: { type: Date, required: true },
  filmography: [{ type: String }],
  awards: [
    {
      title: { type: String, required: true },
      year: { type: Number, required: true }
    }
  ],
  photos: [{ type: String }]
});

const Actor = mongoose.model('Actor', actorSchema);
module.exports = Actor;
