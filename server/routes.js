// backend/routes/data.js

const express = require('express');
const router = express.Router();
const Data = require('./models/Data');

// Define route handler for /api/data
router.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
