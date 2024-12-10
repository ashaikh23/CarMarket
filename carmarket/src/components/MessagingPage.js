import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

function MessagingPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // Simulated authentication check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      try {
        const decodedToken = jwtDecode(token); // Corrected usage
        setUserName(decodedToken.id || 'User'); // Assuming the token contains the user's name
        //console.log('Decoded JWT Token:', token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token'); // Remove expired token
          navigate('/login');
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // State for conversations
  const [conversations, setConversations] = useState({
    seller1: [
      { id: 1, text: "Hi, is the car still available?", sender: "self" },
      { id: 2, text: "Yes, it's available.", sender: "other" },
    ],
    seller2: [
      { id: 1, text: "Can you tell me more about the laptop?", sender: "self" },
      { id: 2, text: "Sure, it's in great condition!", sender: "other" },
    ],
  });

  const [currentSeller, setCurrentSeller] = useState('seller1');
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setConversations((prev) => ({
        ...prev,
        [currentSeller]: [
          ...prev[currentSeller],
          { id: prev[currentSeller].length + 1, text: input, sender: "self" },
        ],
      }));
      setInput('');
    }
  };

  // If not authenticated, display a message
  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          You need to{' '}
          <Button
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              padding: '0',
              fontSize: 'inherit',
              color: '#007bff',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign In
          </Button>{' '}
          to access the Messaging Page.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '8px 16px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#333333',
            },
          }}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Sidebar for Conversations */}
      <Box
        sx={{
          width: '25%',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            padding: 2,
            fontWeight: 'bold',
            borderBottom: '1px solid #ddd',
          }}
        >
          Conversations
        </Typography>
        {Object.keys(conversations).map((seller) => (
          <ListItem
            key={seller}
            button
            onClick={() => setCurrentSeller(seller)}
            sx={{
              padding: 2,
              cursor: 'pointer',
              backgroundColor: currentSeller === seller ? '#f0f0f0' : '#ffffff',
              '&:hover': {
                backgroundColor: '#f9f9f9',
              },
            }}
          >
            <ListItemText
              primary={`Chat with ${seller}`}
              sx={{ fontWeight: currentSeller === seller ? 'bold' : 'normal' }}
            />
          </ListItem>
        ))}
      </Box>

      {/* Chat Window */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            padding: 2,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {userName}'s Messaging Page
          </Typography>
          <Button
            onClick={() => navigate('/')}
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              padding: '4px 12px',
            }}
          >
            Home
          </Button>
        </Box>

        {/* Messages List */}
        <Box
          sx={{
            flex: 1,
            padding: 2,
            overflowY: 'auto',
            backgroundColor: '#f9f9f9',
          }}
        >
          <List>
            {conversations[currentSeller].map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent: message.sender === 'self' ? 'flex-end' : 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <Box
                  sx={{
                    padding: 1.5,
                    borderRadius: '12px',
                    backgroundColor: message.sender === 'self' ? '#000000' : '#e5e5e5',
                    color: message.sender === 'self' ? '#ffffff' : '#000000',
                    maxWidth: '70%',
                  }}
                >
                  <ListItemText primary={message.text} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 2,
            borderTop: '1px solid #ddd',
            backgroundColor: '#ffffff',
          }}
        >
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{
              marginRight: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            sx={{
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '8px 16px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333333',
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default MessagingPage;
