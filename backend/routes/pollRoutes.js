const express = require('express');
const { getPolls, createPoll} = require('../controllers/pollController');
const router = express.Router();

router.get('/getPoll', getPolls);        
router.post('/createPoll', createPoll);     

module.exports = router;
