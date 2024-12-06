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

  

module.exports = router;
