const express = require('express');
const router = express.Router();
const { castVote, getVoter,getAllVoter } = require('../controllers/voteController');

// Route to cast a vote
router.post('/cast', castVote);
router.get('/getVoter/:id', getVoter);
router.get('/voters', getAllVoter);

module.exports = router;
