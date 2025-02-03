const mongoose = require("mongoose");

const votingOfficerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  officerId: { type: String, required: true, unique: true },
  otp: { type: String, default: null },
  otpExpires: { type: Date, default: null },
  role: { type: String, default: "officer" },
});

module.exports = mongoose.model("VotingOfficer", votingOfficerSchema);
