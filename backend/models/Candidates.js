const mongoose =require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    C_ID: { type: String, required: true },
    partyName: { type: String, required: true },
    votes: { type: Number, required: true, default: 0 },
});

const Candidate = mongoose.model('Candidate', CandidateSchema); 
module.exports = Candidate;