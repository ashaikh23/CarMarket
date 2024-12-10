import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token from localStorage on component mount
    localStorage.removeItem('token');
  }, []);

  const handleRedirectToLogin = () => {
    navigate('/login'); // Redirect to login page
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
          You have been logged out
        </Typography>
        <Typography variant="body1" mb={3}>
          Your session has ended. Please log in again to access your account.
        </Typography>
        <Button
          onClick={handleRedirectToLogin}
          variant="contained"
          sx={{
            borderRadius: '4px',
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Go to Login
        </Button>
      </Paper>
    </Box>
  );
}

export default LogoutPage;
