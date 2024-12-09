import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { useNavigate } from 'react-router-dom';

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
      const response = await axios.post('/api/auth/register', { username, email, password });

      // On success, navigate to login page
      alert(response.data.message);
      navigate('/login'); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="sign-up-page">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignUpPage;
