const Voter = require('../models/Voter');
const Candidate = require('../models/Candidates');

const getVoter = async (req, res) => {
    try {
        const { id } = req.params; // Get voterId from URL params
        const voter = await Voter.findOne({ voterId: id }); // Query the database
        
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }
        
        return res.status(200).json(voter); // Respond with voter details
    } catch (error) {
        console.error('Error getting voter:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const castVote = async (req, res) => {
    try {
        const { voterId, candidateId } = req.body;

        console.log("Received data: ", { voterId, candidateId });

        // Check if the voter exists
        const voter = await Voter.findOne({ voterId });
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        // Check if the voter has already voted
        if (voter.hasVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        // Check if the candidate exists
        const candidate = await Candidate.findById(candidateId);
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

        // Return the updated voter details along with the candidate
        res.status(200).json({ message: 'Vote cast successfully', voter, candidate });
    } catch (error) {
        console.error('Error casting vote:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


module.exports = { castVote ,getVoter};
