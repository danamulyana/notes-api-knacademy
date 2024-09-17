const express = require('express');
const notesController = require('../controller/noteController');
const authController = require('../controller/authController');
const router = express.Router();

// Semua route harus diproteksi (user harus login)
router.use(authController.protect);

router
  .route('/')
  .get(notesController.getAllNotes)    // Mendapatkan semua catatan untuk user yang sedang login
  .post(notesController.createNote);   // Membuat catatan baru untuk user yang sedang login

router.route('/archived')
  .get(notesController.getAllNotesArchived);

router.route('/:id/archive')
  .post(notesController.archiveNote);

router.route('/:id/unarchive')
  .post(notesController.unarchiveNote);

router
  .route('/:id')
  .get(notesController.getNote)        // Mendapatkan catatan berdasarkan ID (hanya jika milik user)
  .patch(notesController.updateNote)   // Mengupdate catatan berdasarkan ID (hanya jika milik user)
  .delete(notesController.deleteNote); // Menghapus catatan berdasarkan ID (hanya jika milik user)

module.exports = router;
