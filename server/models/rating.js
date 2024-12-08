const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The seller being rated
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // The user giving the rating
    rating: { type: Number, required: true, min: 1, max: 5 },                      // Rating value
    comment: { type: String, default: '' },                                       // Optional comment
    timestamp: { type: Date, default: Date.now }                                  // Timestamp
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
