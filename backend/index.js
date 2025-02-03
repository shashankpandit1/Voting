const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  
const candidateRoutes = require('./routes/candidateRoutes');
const pollRoutes = require('./routes/pollRoutes');
const voteRoutes = require('./routes/voteRoutes');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Routes
app.use('/api/auth', authRoutes);  // Route for authentication-related actions
app.use('/api/candidates', candidateRoutes);  // Route for candidate-related actions
app.use('/api/poll', pollRoutes);  
app.use('/api/vote', voteRoutes);  

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
