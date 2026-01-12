const express = require('express');
const router = express.Router();
const { registerUser, getRegistrations } = require('../controllers/registrationController');

// @route   POST /api/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   GET /api/registrations
// @desc    Get all registrations (Admin use)
// @access  Private (should be protected in production)
router.get('/registrations', getRegistrations);

module.exports = router;