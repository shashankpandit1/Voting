import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';  
import './VoterDashboard.css';

const mockConstituency = {
  name: 'Constituency 12',
  representative: 'Candidate Y',
  population: '1,000,000',
  state: 'State A',
  region: 'Region X',
};

const VoterDashboard = () => {
  const [polls, setPolls] = useState([]);
  const [showSection, setShowSection] = useState('polls');
  const [voterId, setVoterId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVoterDetails = localStorage.getItem('voterDetails');
    
    if (storedVoterDetails) {
      try {
        const parsedDetails = JSON.parse(storedVoterDetails);
        setVoterId(parsedDetails.voterId); // Get voterId from localStorage
      } catch (error) {
        console.error('Error parsing voterDetails:', error);

        navigate('/'); // Redirect to the login page if there's an error with the data
      }
    } else {
      navigate('/'); // If no voter details in localStorage, redirect to login page
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/poll/getPoll`)
      .then((res) => res.json())
      .then((data) => setPolls(data))
      .catch((error) => console.error('Error fetching polls:', error));
  }, []);

  // ✅ Updated handleVote function to navigate with voterId
  const handleVote = () => {
    console.log('Voter ID:', voterId);
    if (!voterId) {
      console.error('No voterId found!');
      return;
    }
    navigate(`/vote`, { state: { voterId } }); // Pass voterId to the Cast Vote page
  };

  return (
    <Container className="voter-dashboard-container">
      {/* Hero Section */}
      <Box className="voter-dashboard-hero">
        <Typography variant="h4" className="section-title" gutterBottom>
          Welcome to Your Voter Dashboard
        </Typography>
        <Typography variant="subtitle1" className="section-margin">
          Manage your voting activities and stay updated with your constituency.
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Box className="navigation-links">
        <Button
          onClick={() => setShowSection('polls')}
          className={`nav-button ${showSection === 'polls' ? 'active' : ''}`}
        >
          Active Polls
        </Button>
        <Button
          onClick={() => setShowSection('constituency')}
          className={`nav-button ${showSection === 'constituency' ? 'active' : ''}`}
        >
          Constituency Information
        </Button>
      </Box>

      {/* Active Polls Section */}
      {showSection === 'polls' && (
        <Box className="active-polls section-margin">
          <Typography variant="h5" className="section-title">
            Active Polls
          </Typography>
          <Grid container spacing={3}>
            {polls.length > 0 ? (
              polls.map((poll) => (
                <Grid item xs={12} md={6} key={poll._id}>
                  <Card className="card">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {poll.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {poll.description}
                      </Typography>
                    </CardContent>
                    <CardActions className="card-actions">
                      <Button
                        variant="contained"
                        onClick={handleVote} // Trigger vote action
                        className="vote-button"
                      >
                        Vote Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No active polls available.</Typography>
            )}
          </Grid>
        </Box>
      )}

      {/* Constituency Information Section */}
      {showSection === 'constituency' && (
        <Box className="constituency-info section-margin">
          <Typography variant="h5" className="section-title">
            Constituency Information
          </Typography>
          <Card className="constituency-card">
            <CardContent>
              <Typography variant="h6">Constituency: {mockConstituency.name}</Typography>
              <Typography variant="body2">Representative: {mockConstituency.representative}</Typography>
              <Typography variant="body2">Population: {mockConstituency.population}</Typography>
              <Typography variant="body2">State: {mockConstituency.state}</Typography>
              <Typography variant="body2">Region: {mockConstituency.region}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default VoterDashboard;
