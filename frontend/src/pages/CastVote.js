import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Button, Box, Card, CardContent } from '@mui/material';
import './CastVote.css';

const CastVote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voterId, setVoterId] = useState(null);
  const [voterDetails, setVoterDetails] = useState(null); // State to store voter details

  useEffect(() => {
    // Retrieve voterId either from localStorage or from the location passed from the previous page
    const storedVoterDetails = JSON.parse(localStorage.getItem('voterDetails'));
    if (storedVoterDetails && storedVoterDetails.identifier) {
      setVoterId(storedVoterDetails.identifier); // Use identifier instead of voterId
    } else if (location.state && location.state.voterId) {
      setVoterId(location.state.voterId); // Get voterId passed through navigate state
    } else {
      navigate('/voter-dashboard'); // Redirect if no voterId found
    }
  }, [navigate, location]);

  // ✅ Fetch Voter Details based on voterId
  useEffect(() => {
    if (voterId) {
      const fetchVoterDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/vote/getVoter/${voterId}`); // Use voterId in the URL
          const data = await response.json();
          setVoterDetails(data); // Store the fetched voter details in state
        } catch (error) {
          console.error('Error fetching voter details:', error);
        }
      };

      fetchVoterDetails();
    }
  }, [voterId]);

  // ✅ Fetch Candidates from Backend
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/candidates');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // ✅ Handle Vote Submission
  const handleVote = async () => {
    if (!selectedCandidate) {
      alert('Please select a candidate.');
      return;
    }

    if (voterDetails && voterDetails.hasVoted) {
      alert('You have already voted.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/vote/cast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voterId, // Use voterId from localStorage
          candidateId: selectedCandidate,
        }),
      });

      if (response.ok) {
        alert('Vote cast successfully!');
        navigate('/voter-dashboard');
      } else {
        alert('Error casting vote.');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('An error occurred while submitting your vote.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cast Your Vote
      </Typography>

      {/* Display Voter Details */}
      {voterDetails && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Voter ID: {voterId}</Typography>
            <Typography variant="h6">Name: {voterDetails.name}</Typography> {/* Display the voter name */}
            {voterDetails.hasVoted && (
              <Typography variant="h6" color="error">You have already voted.</Typography>
            )}
          </CardContent>
        </Card>
      )}

      <Box>
        <Typography variant="h6">Select a Candidate:</Typography>
        <FormControl fullWidth>
          <InputLabel id="candidate-select-label">Choose Candidate</InputLabel>
          <Select
            labelId="candidate-select-label"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            fullWidth
            disabled={voterDetails && voterDetails.hasVoted}
          >
            {loading ? (
              <MenuItem value="">
                <em>Loading candidates...</em>
              </MenuItem>
            ) : (
              candidates.map((candidate) => (
                <MenuItem key={candidate._id} value={candidate._id}>
                  {candidate.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Box>

      {/* Disable the Submit button if the user has already voted */}
      <Button
        variant="contained"
        onClick={handleVote}
        disabled={!selectedCandidate || (voterDetails && voterDetails.hasVoted)}
        sx={{ mt: 3 }}
      >
        Submit Vote
      </Button>
    </Container>
  );
};

export default CastVote;
