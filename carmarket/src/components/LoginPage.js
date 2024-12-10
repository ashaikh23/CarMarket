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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post('/api/auth/login', { email, password });

      // On successful login, store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate to the landing page or dashboard
      navigate('/'); // Redirect to the landing page
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
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
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
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
              Login
            </Button>
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              Need to create an account?{' '}
              <Link
                component={RouterLink}
                to="/signup"
                underline="hover"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  '&:hover': {
                    color: '#555',
                  },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
