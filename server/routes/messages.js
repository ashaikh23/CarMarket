import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
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
import axios from 'axios';


function MessagingPage() {
 const navigate = useNavigate();
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [conversations, setConversations] = useState([]);
 const [messages, setMessages] = useState([]);
 const [userName, setUserName] = useState('');
 const [currentSeller, setCurrentSeller] = useState(null);
 const [input, setInput] = useState('');




 useEffect(() => {
   const token = localStorage.getItem('token');
   if (token) {
     setIsAuthenticated(true);
     try {
       const decodedToken = jwtDecode(token); // Corrected usage
       const userID = decodedToken.id; // Extract userID from the token
       // Fetch user information
       axios
       .get(`http://localhost:3000/api/messages/retrieveByID/${userID}`, {
         headers: { Authorization: `Bearer ${token}` }, // Pass token in the headers
       })
       .then((response) => {
         // Use the username from the response
         setUserName(response.data.username);
       })
         .catch(error => {
           console.error('Error fetching user information:', error);
         });        //console.log('Decoded JWT Token:', token);
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




 useEffect(() => {
   const token = localStorage.getItem('token');
   if (token) {
     try {
       const decodedToken = jwtDecode(token);
       if (decodedToken.exp * 1000 < Date.now()) {
         localStorage.removeItem('token');
         navigate('/login');
         return;
       }


       setIsAuthenticated(true);
       setUserName(decodedToken.username || 'User');


       // Fetch conversations
       axios
         .get(`http://localhost:3000/api/messages/conversations`, {
           headers: { Authorization: `Bearer ${token}` },
         })
         .then((response) => {
           setConversations(response.data);
           if (response.data.length > 0) {
             setCurrentSeller(response.data[0]._id); // Set the first conversation by default
           }
         })
         .catch((error) => {
           console.error('Error fetching conversations:', error);
         });
     } catch (err) {
       console.error('Invalid token:', err);
       localStorage.removeItem('token');
       navigate('/login');
     }
   } else {
     navigate('/login');
   }
 }, [navigate]);


 useEffect(() => {
   if (currentSeller) {
     const token = localStorage.getItem('token');
     axios
       .get(`http://localhost:3000/api/messages/history/${currentSeller}`, {
         headers: { Authorization: `Bearer ${token}` },
       })
       .then((response) => {
         setMessages(response.data);
       })
       .catch((error) => {
         console.error('Error fetching messages:', error);
       });
   }
 }, [currentSeller]);


 const handleSendMessage = () => {
   const token = localStorage.getItem('token');
   const userID = jwtDecode(token).id;
    if (input.trim()) {
     axios
       .post(
         `http://localhost:3000/api/messages/send`,
         {
           receiverId: currentSeller,
           content: input,
         },
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       )
       .then((response) => {
         // Append the new message to the state
         setMessages((prev) => [
           ...prev,
           { ...response.data.data, sender: userID }, // Ensure sender is set as the current user
         ]);
         setInput('');
       })
       .catch((error) => {
         console.error('Error sending message:', error);
       });
   }
 };


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
       {conversations.map((conversation) => (
         <ListItem
           key={conversation._id}
           button
           onClick={() => setCurrentSeller(conversation._id)}
           sx={{
             padding: 2,
             cursor: 'pointer',
             backgroundColor: currentSeller === conversation._id ? '#f0f0f0' : '#ffffff',
             '&:hover': {
               backgroundColor: '#f9f9f9',
             },
           }}
         >
           <ListItemText
             primary={`Chat with ${conversation.username}`}
             sx={{ fontWeight: currentSeller === conversation._id ? 'bold' : 'normal' }}
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
 {messages.map((message) => {
   const isCurrentUser = message.sender === jwtDecode(localStorage.getItem('token')).id;
   return (
     <ListItem
       key={message._id}
       sx={{
         justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
         marginBottom: '8px',
       }}
     >
       <Box
         sx={{
           padding: 1.5,
           borderRadius: '12px',
           backgroundColor: isCurrentUser ? '#000000' : '#e5e5e5',
           color: isCurrentUser ? '#ffffff' : '#000000',
           maxWidth: '70%',
         }}
       >
         <ListItemText primary={message.content} />
       </Box>
     </ListItem>
   );
 })}
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



