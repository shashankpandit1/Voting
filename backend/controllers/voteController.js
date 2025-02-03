const Voter = require('../models/Voter');
const Candidate = require('../models/Candidates');

const castVote = async (req, res) => {
    try {
        const { voterId, candidateId } = req.body;

        console.log("Received data: ", { voterId, candidateId });

        // Check if the voter exists
        const voter = await Voter.findOne({ voterId });
        console.log("Voter found: ", voter);

        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        // Check if the voter has already voted
        if (voter.hasVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        // Check if the candidate exists
        const candidate = await Candidate.findById(candidateId);
        console.log("Candidate found: ", candidate);

        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Update the candidate's vote count
        candidate.votes += 1;
        await candidate.save();
        console.log("Updated candidate: ", candidate);

        // Mark voter as voted
        voter.hasVoted = true;
        voter.votedFor = candidate._id;
        await voter.save();
        console.log("Updated voter: ", voter);

        res.status(200).json({ message: 'Vote cast successfully', candidate });
    } catch (error) {
        console.error('Error casting vote:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { castVote };
