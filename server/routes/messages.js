const express = require('express');
const Message = require('../models/message');
const User = require('../models/user');
const authenticate = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

const router = express.Router();

// Route to send a message
router.post('/send', authenticate, async (req, res) => {
    const { receiverId, content } = req.body;

    try {
        // Validate the receiver
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        // Validate the content
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Message content cannot be empty' });
        }

        // Create and save the message
        const message = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content,
        });
        await message.save();

        res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to retrieve messages between two users (with pagination)
router.get('/history/:userId', authenticate, async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    try {
        // Retrieve messages between the current user and the other user
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: userId },
                { sender: userId, receiver: req.user.id },
            ],
        })
            .sort({ timestamp: 1 })
            .populate('sender', 'username')
            .populate('receiver', 'username')
            .skip((page - 1) * limit) // Pagination
            .limit(parseInt(limit));

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a list of all users the current user has a conversation with
router.get('/conversations', authenticate, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Find all messages where the user is either the sender or the receiver
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).select('sender receiver -_id');

        // Extract unique user IDs involved in conversations
        const userIds = new Set();
        messages.forEach((msg) => {
            if (msg.sender.toString() !== userId.toString()) {
                userIds.add(msg.sender.toString());
            }
            if (msg.receiver.toString() !== userId.toString()) {
                userIds.add(msg.receiver.toString());
            }
        });

        // Fetch user details for these IDs
        const users = await User.find({ _id: { $in: Array.from(userIds) } }).select(
            '_id username email'
        );

        res.status(200).json(users); // Return the list of users
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
