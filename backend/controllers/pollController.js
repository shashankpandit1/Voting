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
    const { title, description, startDate, endDate } = req.body;

    // Validate start and end dates
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required." });
    }

    // Ensure the start date is earlier than the end date
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "Start date must be earlier than end date." });
    }

    // Create a new poll with the provided details
    const newPoll = new Poll({
      title,
      description,
      startDate,
      endDate,
    });

    // Save the poll to the database
    await newPoll.save();

    // Return the newly created poll
    res.status(201).json(newPoll);
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


module.exports = { getPolls, createPoll};
