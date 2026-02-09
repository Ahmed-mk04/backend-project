const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// @route   POST /auth/register
// @desc    Register user
// @access  Public
router.post('/register', authController.register);

// @route   POST /auth/login
// @desc    Login user
// @access  Public
router.post('/login', passport.authenticate('local'), authController.login);

// @route   GET /auth/logout
// @desc    Logout user
// @access  Private
router.get('/logout', authController.logout);

module.exports = router;
