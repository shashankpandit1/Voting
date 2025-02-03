const express = require('express');
const router = express.Router();
const { castVote, getVoter } = require('../controllers/voteController');

// Route to cast a vote
router.post('/cast', castVote);
router.get('/getVoter/:id', getVoter);

module.exports = router;
