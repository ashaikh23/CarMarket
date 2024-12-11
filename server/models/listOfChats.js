const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ], // List of user IDs
  lastMessage: { type: String, default: '' }, // Optional: Last message summary
  updatedAt: { type: Date, default: Date.now }, // Timestamp for the last update
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message', // Reference to the Message model
    },
  ], // Array of message references
});

chatSchema.pre('save', function (next) {
  this.updatedAt = Date.now(); // Update the `updatedAt` timestamp whenever the chat is saved
  next();
});

module.exports = mongoose.model('Chat', chatSchema);
