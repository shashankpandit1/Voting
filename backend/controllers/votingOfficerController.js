const VotingOfficer = require("../models/VotingOfficer"); // Import the VotingOfficer model

// Generate OTP for login attempts
const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  return otp.toString();
};

// Function to handle voting officer login (OTP generation on login attempt)
const login = async (req, res) => {
  const { identifier } = req.body; // identifier can be mobile or officerId

  try {
    // Find voting officer based on the identifier (mobile or officerId)
    const officer = await VotingOfficer.findOne({
      $or: [{ mobile: identifier }, { officerId: identifier }],
    });

    if (!officer) {
      return res.status(400).json({ message: "Voting Officer not found" });
    }

    // Generate OTP for login attempt
    const otp = generateOtp();
    const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    // Update the OTP and expiration time in the database
    officer.otp = otp;
    officer.otpExpires = otpExpires;
    await officer.save();

    // Send OTP to the officer (through an alert, email, or SMS in real scenarios)
    // For now, we'll just return the OTP in the response (you should send it via email/SMS)
    res.status(200).json({
      message: "OTP sent successfully. Please check your OTP.",
      otp, // Remove this in production for security reasons
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error during login OTP generation",
        error: error.message,
      });
  }
};

// Function to verify OTP for the voting officer
const verifyOtp = async (req, res) => {
  const { identifier, otp } = req.body; // identifier can be mobile or officerId

  try {
    // Find voting officer based on the identifier (mobile or officerId)
    const officer = await VotingOfficer.findOne({
      $or: [{ mobile: identifier }, { officerId: identifier }],
    });

    if (!officer) {
      return res.status(400).json({ message: "Voting Officer not found" });
    }

    // Check if OTP exists and is valid
    if (!officer.otp || officer.otp !== otp || officer.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP fields after successful verification
    officer.otp = null;
    officer.otpExpires = null;
    await officer.save();

    // Respond with the officer details
    res.status(200).json({
      message: "Login successful",
      officerDetails: {
        name: officer.name,
        mobile: officer.mobile,
        officerId: officer.officerId, // Include other fields as needed
        role: officer.role, // Include role if needed
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error during OTP verification",
        error: error.message,
      });
  }
};

module.exports = {
  login,
  verifyOtp,
};
