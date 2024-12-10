const express = require('express');
const connectDB = require('./server/db'); // Import database connection
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./server/routes/auth')); // Authentication routes
app.use('/api/listings', require('./server/routes/listings')); // Listings routes
app.use('/api/messages', require('./server/routes/messages'));
app.use('/api/car', require('./server/routes/cars'))
app.use('/api/ratings', require('./server/routes/ratings'))

// Default Route
app.get('/', (req, res) => {
    res.send('Car Marketplace API is running!');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
