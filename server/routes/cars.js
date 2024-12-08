const express = require('express');
const Message = require('../models/car'); // Import Message model
const User = require('../models/user'); // Import User model
const authenticate = require('../middleware/authMiddleware'); // Import authentication middleware
const mongoose = require('mongoose');
const Car = require('../models/car');

const router = express.Router()

router.post('/postlisting', authenticate, async (req, res)=>{
    const { make, model, year, price, miles, condition } = req.body;

    try {
        // Create and save the message
        const car = new Car({
            postedBy: req.user.id, // Current user (sender),
            make: make,
            model: model,
            year: year,
            price: price,
            miles: miles,
            condition: condition,
            timestamp: Date.now()
        });
        await car.save();

        res.status(201).json({ message: 'car posted successfully', data: car });
    } catch (err) {
        res.status(500).json({ error: err.message });
}})

router.get('/getcars', authenticate, async (req, res)=>{
    try {
        const cars = await Car.find()
            .sort({ timestamp: 1 }) // Sort by timestamp (oldest to newest)
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/viewlisting/:postingID', authenticate, async (req, res) => {
    const { postingID } = req.params;
    try {
        const listing = await Car.findById(postingID);
        res.status(200).json(listing);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//must test trying to delete someone elses post
router.delete('/deletelisting/:postingID', authenticate, async (req, res) => {
    const { postingID } = req.params;
    let listing
    try {
        listing = await Car.findById(postingID);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    if (listing != null && listing.postedBy == req.user.id){
        try {
            const listing = await Car.findByIdAndDelete(postingID);
            res.status(200).json("listing has been delete");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    else {
        res.status(200).json("listing does not exist or is not yours") //need to seperate
    }
});

//get all posting by a certain user
router.get('/userlistings', authenticate, async (req, res) => {
    try {
        // Fetch listings posted by the authenticated user
        const listings = await Car.find({ postedBy: req.user.id });

        if (listings.length === 0) {
            return res.status(404).json({ message: 'No listings found for this user.' });
        }

        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/sellerlistings/:sellerID', authenticate, async (req, res) => {
    const { sellerID } = req.params;

    try {
        // Fetch listings posted by the authenticated user
        const listings = await Car.find({ postedBy: sellerID });

        if (listings.length === 0) {
            return res.status(404).json({ message: 'No listings found for this user.' });
        }

        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
