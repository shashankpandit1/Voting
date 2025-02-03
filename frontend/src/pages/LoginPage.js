import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import loginpagebg from '../assets/loginpagebg.jpg'; // Import the background image
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); // Mobile, Aadhar, or Voter ID
  const [role, setRole] = useState('voter');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false); // State to control OTP dialog visibility
  const [otpReceived, setOtpReceived] = useState(''); // Store OTP to show in the dialog

  const navigate = useNavigate();
  const handleIdentifierSubmit = async () => {
    if (!identifier) {
      setError('Please enter a valid identifier.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        identifier,
      });

      if (response.data.message === 'Voter not found') {
        setError('Voter not found. Please check your identifier.');
        return;
      }

      // ✅ Store voter details in localStorage
      localStorage.setItem('voterDetails', JSON.stringify({
        identifier: response.data.identifier,
        role: response.data.role,
        voterId: response.data.voterId, // ✅ Ensure voterId is stored
      }));

      setShowOtpField(true);
      setOtpReceived(response.data.otp);
      setOtpDialogOpen(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing request.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        identifier,
        otp,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        const voterDetails = JSON.parse(localStorage.getItem('voterDetails'));
        voterDetails.voterId = response.data.voterId; // ✅ Ensure voterId is stored
        localStorage.setItem('voterDetails', JSON.stringify(voterDetails));

        setError('');
        // ✅ Redirect after login
        navigate(role === 'voter' ? '/voter-dashboard' : '/officer-dashboard');
      }
    } catch (err) {
      setError('Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  // Close OTP dialog
  const handleOtpDialogClose = () => {
    setOtpDialogOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${loginpagebg})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire page
        backgroundPosition: 'center', // Center the image
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column', // Ensure the content is placed correctly
        justifyContent: 'flex-start',
      }}
    >
      <Box
        sx={{
          pt: 10, // Add padding to move the card down
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
            width: '35%', // Cover 35% of the screen width
            maxWidth: '500px', // Optional: to limit the maximum width of the card
            height: 'auto', // Adjust to content size
            minHeight: '75vh', // Increase the height of the login card
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
            backdropFilter: 'blur(5px)', // Blur effect
            borderRadius: 0, // Remove rounded corners
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Space between login fields and boxes
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            India's Online Voting Platform
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
            Welcome! Please log in to continue.
          </Typography>

          {/* Role Selection */}
          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ justifyContent: 'center', mb: 3 }}
          >
            <FormControlLabel value="voter" control={<Radio />} label="Voter" />
            <FormControlLabel value="officer" control={<Radio />} label="Voting Officer" />
          </RadioGroup>

          {/* Identifier Input */}
          {!showOtpField ? (
            <>
              <TextField
                label="Enter Mobile / Aadhar / Voter ID"
                variant="outlined"
                fullWidth
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                sx={{ mb: 3 }}
                inputProps={{ maxLength: 12 }} // Assuming Aadhar ID is 12 digits and Voter ID/ Mobile number 10 digits
              />
              <Button
                variant="contained"
                onClick={handleIdentifierSubmit}
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold' }}
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ mb: 3 }}
                inputProps={{ maxLength: 6 }}
              />
              <Button
                variant="contained"
                onClick={handleOtpSubmit}
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold' }}
                disabled={loading}
              >
                {loading ? 'Verifying OTP...' : 'Submit OTP'}
              </Button>
            </>
          )}

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* Information Boxes inside the login card */}
          <Box sx={{ mt: 3 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: '#1976d2',
                color: 'white',
                textAlign: 'center',
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6">Secure</Typography>
              <Typography variant="body2">
                Secure voting with advanced encryption and blockchain technology
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: '#1976d2',
                color: 'white',
                textAlign: 'center',
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6">Transparent</Typography>
              <Typography variant="body2">
                Audit trail to ensure transparency throughout the process
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: '#1976d2',
                color: 'white',
                textAlign: 'center',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">Accessible</Typography>
              <Typography variant="body2">
                Vote from anywhere, on any device, anytime
              </Typography>
            </Paper>
          </Box>
        </Paper>
      </Box>

      {/* OTP Dialog */}
      <Dialog open={otpDialogOpen} onClose={handleOtpDialogClose}>
        <DialogTitle>OTP Sent</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your OTP is: <strong>{otpReceived}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please use the OTP above to verify your identity.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOtpDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginPage;
