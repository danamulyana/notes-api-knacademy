const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',  // Menghubungkan ke model User
    required: [true, 'A note must have an owner'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Populasi otomatis owner pada saat get data
noteSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'owner',
      select: 'username email',  // Hanya mengambil username dan email dari User
    });
    next();
  });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
