const Poll = require('../models/Poll');

// @desc Get all polls
// @route GET /api/polls
const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc Create a new poll
// @route POST /api/polls
const createPoll = async (req, res) => {
  try {
    const { title, description, candidates } = req.body;
    const newPoll = new Poll({ title, description, candidates });
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { getPolls, createPoll};
