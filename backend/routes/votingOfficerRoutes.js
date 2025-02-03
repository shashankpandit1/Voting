const express = require("express");
const router = express.Router();
const { login, verifyOtp } = require("../controllers/votingOfficerController");

// Route for voting officer login (send OTP)
router.post("/login", login);

// Route to verify OTP for voting officer
router.post("/verify-otp", verifyOtp);

module.exports = router;
