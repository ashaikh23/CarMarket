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
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    make: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    miles: {type: Number, required: true},
    condition: {type: String, required: true},
    timestamp: { type: Date, default: Date.now },
});


const Car = mongoose.model('Car', carSchema);
module.exports = Car;
