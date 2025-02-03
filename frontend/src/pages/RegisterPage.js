import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import axios from 'axios';
import registerpagebg from '../assets/loginpagebg.jpg'; // Background image

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [voterId, setVoterId] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle registration submit
  const handleRegisterSubmit = async () => {
    if (!name.trim() || !mobile || !voterId || !aadhar) {
      setError('Please fill in all the required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        name,
        mobile,
        voterId,
        aadhar,
      });

      if (response.data.message) {
        setError('');
        // Registration successful, redirect or show success message
        window.location.href = '/login'; // Redirect to login page after successful registration
      }
    } catch (err) {
      setError('Error registering voter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${registerpagebg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Box
        sx={{
          pt: 10,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '35%',
            maxWidth: '500px',
            height: 'auto',
            minHeight: '75vh',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Voter Registration
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
            Register to access India's online voting system.
          </Typography>

          {/* Registration Form */}
          <>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              sx={{ mb: 3 }}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              label="Voter ID"
              variant="outlined"
              fullWidth
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Aadhar Number"
              variant="outlined"
              fullWidth
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              onClick={handleRegisterSubmit}
              fullWidth
              sx={{ py: 1.5, fontWeight: 'bold' }}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </>

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default RegisterPage;
