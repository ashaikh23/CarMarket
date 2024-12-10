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
    const currentUserId = req.user.id;

    try {
        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId },
            ],
        })
            .sort({ timestamp: 1 }) // Oldest to newest
            .populate('sender', 'username')
            .populate('receiver', 'username');

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get a list of all users the current user has a conversation with
router.get('/conversations', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        // Find distinct users in the messages involving the current user
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).populate('sender receiver', 'username'); // Populate usernames

        // Extract unique users
        const uniqueUsers = {};
        messages.forEach((msg) => {
            if (msg.sender._id.toString() !== userId.toString()) {
                uniqueUsers[msg.sender._id] = { username: msg.sender.username, _id: msg.sender._id };
            }
            if (msg.receiver._id.toString() !== userId.toString()) {
                uniqueUsers[msg.receiver._id] = { username: msg.receiver.username, _id: msg.receiver._id };
            }
        });

        res.status(200).json(Object.values(uniqueUsers));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/retrieveByID/:userID', authenticate, async (req, res) => {
    const { userID } = req.params;
    try {
        const user = await User.findById(userID);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
