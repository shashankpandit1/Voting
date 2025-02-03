const express = require('express');
const router = express.Router();
const { register, login, verifyOtp } = require('../controllers/authController');

// Register Route - For user registration
router.post('/register', register);

// Login Route - For generating OTP for login
router.post('/login', login);

// OTP Verification Route - For verifying OTP and generating JWT token
router.post('/verify-otp', verifyOtp);

module.exports = router;
