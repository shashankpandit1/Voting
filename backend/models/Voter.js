const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    mobile: { 
      type: String, 
      required: true, 
      unique: true 
    },
    voterId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    aadhar: { 
      type: String, 
      required: true, 
      unique: true 
    },
    otp: { 
      type: String, 
      default: null 
    },
    otpExpires: { 
      type: Date, 
      default: null 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    hasVoted: { 
      type: Boolean, 
      default: false // Default to false, meaning the voter has not voted yet
    },
    votedFor: { 
      type: mongoose.Schema.Types.ObjectId,  // Reference to Candidate model
      ref: 'Candidate',  // Ensure this references the Candidate collection
      default: null // Default is null if no vote has been cast
    }
  },
  { timestamps: true }
);

// Create an index to ensure mobile, voterId, and aadhar are unique.
voterSchema.index({ mobile: 1, voterId: 1, aadhar: 1 }, { unique: true });

module.exports = mongoose.model('Voter', voterSchema);
