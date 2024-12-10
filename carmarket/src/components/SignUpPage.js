import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
} from '@mui/material';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      // Send a POST request to register the user
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      // On success, display success message and navigate to login page
      alert(response.data.message); // Display a message from the server
      navigate('/login'); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 400,
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '16px', // Rounded corners for Paper
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            type="text"
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start', // Align left with fields
              mt: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: '4px', // Slightly rounded corners
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              Create Account
            </Button>
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                underline="hover"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  '&:hover': {
                    color: '#555',
                  },
                }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignUpPage;
