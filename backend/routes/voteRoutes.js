const express = require('express');
const router = express.Router();
const { castVote } = require('../controllers/voteController');

// Route to cast a vote
router.post('/cast', castVote);

module.exports = router;
