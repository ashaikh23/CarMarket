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

/*
const express = require('express');
const connectDB = require('./server/db'); // Import database connection
const Listing = require('./server/models/listings'); // Import Listing model
const dotenv = require('dotenv');



dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
connectDB(); // Call the function to connect to the database

// Routes
app.get('/', (req, res) => {
    res.send('Car Marketplace API is running!');
});

// Fetch All Listings
app.get('/listings', async (req, res) => {
    try {
        const listings = await Listing.find(); // Fetch all listings
        res.json(listings); // Send as JSON
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add New Listing
app.post('/add-listing', async (req, res) => {
    const { name, age } = req.body;
    try {
        const listing = new Listing({ name, age }); // Create a new listing
        await listing.save(); // Save to MongoDB
        res.status(201).json(listing); // Send the saved listing as a response
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/