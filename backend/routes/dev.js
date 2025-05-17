const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add-tokens', async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || typeof amount !== 'number') {
    return res.status(400).json({ error: 'userId and numeric amount are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.tokens += amount;
    await user.save();

    res.json({ message: `Added ${amount} tokens`, tokens: user.tokens });
  } catch (err) {
    console.error('Token update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
