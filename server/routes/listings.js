const express = require('express');
const Listing = require('../models/listings'); // Import Listing model
const authenticate = require('../middleware/authMiddleware'); // Import middleware
const router = express.Router();

// Fetch All Listings (Public Route)
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find(); // Fetch all listings
        res.json(listings); // Send as JSON
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a New Listing (Protected Route)
router.post('/', authenticate, async (req, res) => {
    const { name, age } = req.body;

    try {
        const listing = new Listing({ name, age }); // Create a new listing
        await listing.save(); // Save to MongoDB
        res.status(201).json(listing); // Send the saved listing as a response
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
