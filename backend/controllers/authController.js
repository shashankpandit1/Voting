const Voter = require("../models/Voter");
const jwt = require("jsonwebtoken");

// Register new voter
const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  return otp.toString();
};

const register = async (req, res) => {
  const { name, mobile, voterId, aadhar } = req.body;

  // Validate input data
  if (!name || !mobile || !voterId || !aadhar) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if voter already exists based on mobile, voterId, or aadhar
    const existingVoter = await Voter.findOne({
      $or: [{ mobile }, { voterId }, { aadhar }],
    });
    if (existingVoter) {
      return res.status(400).json({ message: "Voter already registered" });
    }

    // Create new voter document
    const newVoter = new Voter({
      name,
      mobile,
      voterId: voterId.trim().toLowerCase(),
      aadhar,
    });

    // Save voter to the database
    await newVoter.save();

    // Respond with success message (OTP will be shown on frontend)
    res.status(200).json({
      message: "Voter registered successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering voter", error: error.message });
  }
};

// Function to handle voter login (OTP generation on login attempt)
const login = async (req, res) => {
  const { identifier } = req.body; // identifier can be mobile, voterId, or aadhar

  try {
    // Find voter based on the identifier (mobile, voterId, or aadhar)
    const voter = await Voter.findOne({
      $or: [
        { mobile: identifier },
        { voterId: identifier },
        { aadhar: identifier },
      ],
    });

    if (!voter) {
      return res.status(400).json({ message: "Voter not found" });
    }

    // Generate OTP for login attempt
    const otp = generateOtp();
    const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    // Update the OTP and expiration time in the database
    voter.otp = otp;
    voter.otpExpires = otpExpires;
    await voter.save();

    // Send OTP to the user (through an alert, or other methods on frontend)
    // For now, we'll just return the OTP in the response (you should send it via email or SMS)
    // In a real application, do not send the OTP in the response directly like this, as this is for testing.
    res
      .status(200)
      .json({ message: "OTP sent successfully. Please check your OTP.", otp });
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

// Function to verify OTP (once user has entered it)
const verifyOtp = async (req, res) => {
  const { identifier, otp } = req.body; // identifier can be mobile, voterId, or aadhar

  try {
    // Find voter based on the identifier (mobile, voterId, or aadhar)
    const voter = await Voter.findOne({
      $or: [
        { mobile: identifier },
        { voterId: identifier },
        { aadhar: identifier },
      ],
    });

    if (!voter) {
      return res.status(400).json({ message: "Voter not found" });
    }

    // Check if OTP exists and is valid
    if (!voter.otp || voter.otp !== otp || voter.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP fields after successful verification
    voter.otp = null;
    voter.otpExpires = null;
    await voter.save();

    // Generate JWT token for the voter
    const token = jwt.sign(
      { voterId: voter.voterId, mobile: voter.mobile, aadhar: voter.aadhar },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Respond with success and JWT token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error during OTP verification", error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyOtp,
};
