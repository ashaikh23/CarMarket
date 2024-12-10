const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    miles: { type: Number, required: true },
    condition: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }, // Automatically set the current date and time
    description: { type: String, default: null }, // Optional, can be left empty
    email: { type: String, default: null }, // Optional, can be left empty
    image: { type: String, default: null }, // Optional, default is null
});

// Create a Car model from the schema
const Car = mongoose.model('Car', carSchema);

module.exports = Car;