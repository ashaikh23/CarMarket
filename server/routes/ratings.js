const express = require('express');
const Message = require('../models/car'); // Import Message model
const User = require('../models/user'); // Import User model
const authenticate = require('../middleware/authMiddleware'); // Import authentication middleware
const mongoose = require('mongoose');
const Car = require('../models/car');
const Rating = require('../models/rating')

const router = express.Router()

//have to test average rating and multiple ratings from multiple users and sellers
router.post('/rateSeller/:sellerId', authenticate, async (req, res) => {
    const { sellerId } = req.params;
    const { rating, comment } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    try {
        // Ensure the seller exists
        const seller = await User.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found.' });
        }

        // Check if the user has already rated this seller
        const existingRating = await Rating.findOne({ seller: sellerId, user: req.user.id });

        if (existingRating) {
            // Update the existing rating
            existingRating.rating = rating;
            existingRating.comment = comment || existingRating.comment;
            await existingRating.save();
            return res.status(200).json({ message: 'Rating updated successfully.' });
        }

        // Create a new rating
        const newRating = new Rating({
            seller: sellerId,
            user: req.user.id,
            rating,
            comment
        });
        await newRating.save();

        res.status(201).json({ message: 'Rating submitted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/sellerRatings/:sellerId', async (req, res) => {
    const { sellerId } = req.params;

    try {
        // Fetch all ratings for the seller
        const ratings = await Rating.find({ seller: sellerId }).populate('user', 'username');

        if (ratings.length === 0) {
            return res.status(404).json({ message: 'No ratings found for this seller.' });
        }

        // Calculate the average rating
        const averageRating =
            ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;

        res.status(200).json({
            averageRating: averageRating.toFixed(1),
            totalRatings: ratings.length,
            ratings
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
