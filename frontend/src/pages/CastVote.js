import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Radio, RadioGroup, FormControlLabel, Button, Box } from '@mui/material';
import './CastVote.css';

const CastVote = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voterId, setVoterId] = useState(null);

useEffect(() => {
  const voterDetails = JSON.parse(localStorage.getItem('voterDetails'));
  if (voterDetails && voterDetails.identifier) {
    setVoterId(voterDetails.identifier); // Use identifier instead of voterId
  } else {
    console.log(voterDetails.voterId)
    navigate('/voter-dashboard'); // Redirect if no identifier found
  }
}, [navigate]);

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

    try {
      const response = await fetch('http://localhost:5000/api/vote/cast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voterId, // ✅ Use voterId from localStorage
          candidateId: selectedCandidate,
        }),
      });

      if (response.ok) {
        alert('Vote cast successfully!');
        navigate('/dashboard');
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

      <Box>
        <Typography variant="h6">Select a Candidate:</Typography>
        <RadioGroup value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
          {loading ? (
            <Typography>Loading candidates...</Typography>
          ) : (
            candidates.map((candidate) => (
              <FormControlLabel
                key={candidate._id}
                value={candidate._id}
                control={<Radio />}
                label={candidate.name}
              />
            ))
          )}
        </RadioGroup>
      </Box>

      <Button variant="contained" onClick={handleVote} disabled={!selectedCandidate}>
        Submit Vote
      </Button>
    </Container>
  );
};

export default CastVote;
