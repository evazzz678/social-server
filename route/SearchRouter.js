const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); // Replace with your actual model

router.get('/search', async (req, res) => {
  const { q } = req.query;

  try {
    const results = await User.find({
      name: { $regex: q, $options: 'i' } // Case-insensitive search
    });

    res.json(results);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
