const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Generate JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    message: '',
    token,
    data: {
      user,
    },
  });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (typeof username !== 'string' || username.trim() === '') {
      return res.status(400).json({ message: 'Username is required and must be a string' });
    }
  
    if (typeof password !== 'string') {
      return res.status(400).json({ message: 'Password must be a string' });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Create user
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // Send JWT token
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    // Send JWT token
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Protect Route
exports.protect = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'You are not logged in! Please log in to access.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ status: 'fail', message: 'The user belonging to this token no longer exists.' });
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid token or user not authenticated.' });
  }
};

// Get Current User Data
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};