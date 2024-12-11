import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';

const MessagingPage = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all chats
  const fetchChats = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('You are not authenticated. Please log in.');
      setIsLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/messages/listChats', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to fetch chats`);
      }

      const data = await response.json();
      setChats(data); // Store the fetched chats in state
    } catch (error) {
      console.error('Error fetching chats:', error);
      setErrorMessage('Failed to load chats. Please try again later.');
    } finally {
      setIsLoading(false); // Stop the loading spinner
    }
  };

  // Fetch chats when the component mounts
  useEffect(() => {
    fetchChats();
  }, []);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '1rem' }}>
        Your Chats
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <CircularProgress />
        </Box>
      ) : errorMessage ? (
        <Typography color="error" align="center">
          {errorMessage}
        </Typography>
      ) : chats.length > 0 ? (
        <List>
          {chats.map((chat) => (
            <ListItem
              key={chat._id}
              button
              onClick={() => handleChatClick(chat._id)} // Navigate to a specific chat
              sx={{
                borderBottom: '1px solid #ddd',
                padding: '1rem',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <ListItemText
                primary={`Chat with ${chat.participants
                  .map((p) => p.username)
                  .join(', ')}`}
                secondary={chat.lastMessage || 'No messages yet'}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center">No chats found. Start a conversation!</Typography>
      )}
    </Box>
  );
};

export default MessagingPage;
