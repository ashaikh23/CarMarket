const mongoose = require('mongoose');

// Define schema for listings
const listingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
});

// Create and export the Listing model
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
