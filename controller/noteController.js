const Note = require('../models/noteModel');

// Get All Notes for Current User
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id, archived: false });
    res.status(200).json({
      status: 'success',
      message: "Notes retrieved",
      results: notes.length,
      data: {
        notes,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getAllNotesArchived = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id, archived: true });
    res.status(200).json({
      status: 'success',
      message: "Notes retrieved",
      results: notes.length,
      data: {
        notes,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Create a New Note
exports.createNote = async (req, res) => {
  try {
    // Tambahkan owner (user yang login) ke catatan yang dibuat
    const newNote = await Note.create({
      title: req.body.title,
      body: req.body.body,
      archived: false,
      owner: req.user._id,  // Set pemilik berdasarkan user yang sedang login
    });

    res.status(201).json({
      status: 'success',
      message: "Note Created",
      data: {
        note: newNote,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Get Note by ID (Hanya bisa akses jika pemiliknya)
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });

    if (!note) {
      return res.status(404).json({ status: 'fail', message: 'Note not found or you do not have permission' });
    }

    res.status(200).json({
      status: 'success',
      message: "Note retrieved",
      data: {
        note,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Update Note (Hanya bisa jika pemiliknya)
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },  // Cari berdasarkan ID dan pemilik
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({ status: 'fail', message: 'Note not found or you do not have permission' });
    }

    res.status(200).json({
      status: 'success',
      message: "Note updated",
      data: {
        note,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Delete Note (Hanya bisa jika pemiliknya)
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!note) {
      return res.status(404).json({ status: 'fail', message: 'Note not found or you do not have permission' });
    }

    res.status(200).json({
      status: 'success',
      message: "Note deleted",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Endpoint untuk mengarsipkan sebuah note berdasarkan ID
exports.archiveNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.archived = true; // Mengarsipkan note
    await note.save();
    
    res.json({
      status: "success",
      message: 'Note archived successfully', 
      note 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.unarchiveNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.archived = false; // Mengarsipkan note
    await note.save();
    
    res.json({
      status: "success",
      message: 'Note unarchived successfully', 
      note 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};