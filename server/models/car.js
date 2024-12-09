// const mongoose = require('mongoose');

// const carSchema = new mongoose.Schema({
//     make: String,
//     model: String,
//     year: Number,
//     price: Number,
// });

// const Car = mongoose.model('Car', carSchema);
// module.exports = Car;

// const carSchema = new mongoose.Schema({
//     make: String,
//     model: String,
//     year: Number,
//     price: Number,
//     email: String, 
//     description: String,
// });

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, default: null },  // Image is optional, default is null
});


const Car = mongoose.model('Car', carSchema);
module.exports = Car;
