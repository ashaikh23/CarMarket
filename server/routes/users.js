const express = require('express');
const User = require('../models/user'); // Ensure correct path to User model
const authenticate = require('../middleware/authMiddleware'); // Middleware to verify token
const router = express.Router();

// Fetch user details by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send({ name: user.name });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
