import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Container,
  TextField,
  Link,
} from '@mui/material';
import { styled } from '@mui/system';

const pollsData = [
  {
    id: 1,
    title: 'Presidential Election 2025',
    description: 'Vote for the next President of the country.',
    candidates: ['Candidate A', 'Candidate B', 'Candidate C'],
  },
  {
    id: 2,
    title: 'Local Municipality Elections',
    description: 'Choose your representative for the city council.',
    candidates: ['Candidate X', 'Candidate Y', 'Candidate Z'],
  },
];

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(to bottom, #0066cc, #004080)',  // Gradient from blue to dark blue
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '70vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(3),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  borderRadius: 8,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for contrast
    borderRadius: 8,
    zIndex: -1,
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FF9800', // Orange background
  color: 'white',
  padding: theme.spacing(4, 0),
  textAlign: 'center',
  marginTop: 'auto', // Ensure it sticks to the bottom
  '& a': {
    color: '#fff', // White links
    textDecoration: 'none',
    '&:hover': {
      color: '#e8f5e9', // Light green hover effect
    },
  },
}));

const Homepage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    // Check if user is logged in (Mock authentication check)
    const user = localStorage.getItem('user');
    setLoggedIn(!!user);
  }, []);

  const handleSearchChange = (event) => {
    setPincode(event.target.value);
  };

  const handleSearch = () => {
    if (pincode) {
      // Ideally, you would fetch the polling station based on the entered pincode
      alert(`Searching for polling stations for PINCODE: ${pincode}`);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Box>
          <Typography variant="h3" gutterBottom>
            Welcome to India's Online Voting Platform
          </Typography>
          <Typography variant="h5" gutterBottom>
            Cast your vote for a better future.
          </Typography>
          <TextField
            variant="outlined"
            label="Find your polling station based on PINCODE"
            value={pincode}
            onChange={handleSearchChange}
            sx={{
              width: '100%',
              maxWidth: 400,
              mb: 2,
              backgroundColor: '#e8f5e9', // Light green background
            }}
          />
          <Button
            variant="contained"
            color="success" // Green button
            onClick={handleSearch}
            sx={{
              backgroundColor: '#388e3c', // Green color
              '&:hover': {
                backgroundColor: '#2c6b31', // Darker green on hover
              },
              width: '100%', // Make the button the same width as the text field
              maxWidth: 150,  // Set the button width to be smaller than the text field
            }}
          >
            Search
          </Button>
        </Box>
      </HeroSection>

      {/* Homepage Content */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Ongoing Polls
        </Typography>
        <Grid container spacing={3}>
          {pollsData.map((poll) => (
            <Grid item xs={12} sm={6} md={4} key={poll.id}>
              <Card elevation={3} sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {poll.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {poll.description}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Candidates:
                  </Typography>
                  <ul>
                    {poll.candidates.map((candidate, index) => (
                      <li key={index}>{candidate}</li>
                    ))}
                  </ul>
                  {loggedIn && (
                    <Button variant="contained" color="primary" fullWidth>
                      Vote Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add gap between polls and footer */}
        <Box sx={{ mb: 6 }} /> {/* Margin bottom to add space */}
      </Container>

      {/* Footer Section */}
      <Footer>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <Link href="/voter-registration">Voter Registration</Link>
            <br />
            <Link href="/election-calendar">Election Calendar</Link>
            <br />
            <Link href="/results-statistics">Results and Statistics</Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link href="/contact">Contact</Link>
            <br />
            <Typography variant="body2" gutterBottom>
              Email: info@bharat-evoting.gov.in
            </Typography>
            <Typography variant="body2" gutterBottom>
              Phone: 1800-111-950
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2" gutterBottom>
              © 2024 Bharat e-Voting. All rights reserved.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Follow us on:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Link href="#" target="_blank">Facebook</Link>
                <Link href="#" target="_blank">Twitter</Link>
                <Link href="#" target="_blank">Instagram</Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Footer>
    </Box>
  );
};

export default Homepage;
