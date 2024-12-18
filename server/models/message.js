const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Define schema for messages
const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Create and export the Message model
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
