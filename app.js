const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);

// Root route untuk redirect ke /docs
app.get('/', express.static(path.join(__dirname, '/')));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
