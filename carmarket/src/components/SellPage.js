import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SellYourCar() {
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    miles: '',
    condition: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { make, model, year, price, miles, condition } = carDetails;

    if (!make || !model || !year || !price || !miles || !condition) {
        setErrorMessage('All fields are required');
        return;
    }

    try {
        console.log('Submitting payload:', carDetails);
        console.log('Using token:', token);

        const response = await axios.post(
            'http://localhost:3000/api/car/postlisting',
            carDetails,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        console.log('Car listed successfully:', response.data);
        setErrorMessage(''); // Clear errors if successful
        navigate('/');
    } catch (error) {
        console.error('Error posting car:', error.response || error.message);
        setErrorMessage(
            'An error occurred while posting the listing: ' +
            (error.response?.data?.error || error.message)
        );
    }
};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, fontWeight: 'bold', color: '#333' }}
      >
        Sell Your Car
      </Typography>
      <Button
        onClick={() => navigate('/')}
        sx={{
          textTransform: 'none',
          color: '#007bff',
          textDecoration: 'underline',
          marginBottom: 3,
        }}
      >
        Back to Home
      </Button>
      {errorMessage && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography color="primary" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Typography>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
          padding: '16px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          label="Make"
          name="make"
          value={carDetails.make}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Model"
          name="model"
          value={carDetails.model}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Year"
          name="year"
          value={carDetails.year}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          type="number"
        />
        <TextField
          label="Price"
          name="price"
          value={carDetails.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          type="number"
        />
        <TextField
          label="Miles"
          name="miles"
          value={carDetails.miles}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          type="number"
        />
        <TextField
          label="Condition"
          name="condition"
          value={carDetails.condition}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: '#007bff',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          List Your Car
        </Button>
      </form>
    </Box>
  );
}

export default SellYourCar;