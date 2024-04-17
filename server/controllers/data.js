// backend/controllers/data.js

const Data = require('../models/Data');

exports.importData = async (req, res) => {
  try {
    const sampleData = req.body; // Assuming sample data is sent in the request body
    const insertedData = await Data.insertMany(sampleData);
    res.json({ message: 'Sample data imported successfully', data: insertedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.filterData = async (req, res) => {
  try {
    const { startTime, frequency } = req.query; // Assuming startTime and frequency are query parameters
    // Filter data based on time parameters
    let filter = { ts: { $gte: new Date(startTime) } };
    if (frequency === 'hour') {
      filter.ts.$lt = new Date(new Date(startTime).getTime() + 60 * 60 * 1000);
    } else if (frequency === 'day') {
      filter.ts.$lt = new Date(new Date(startTime).getTime() + 24 * 60 * 60 * 1000);
    } else if (frequency === 'week') {
      filter.ts.$lt = new Date(new Date(startTime).getTime() + 7 * 24 * 60 * 60 * 1000);
    } else if (frequency === 'month') {
      filter.ts.$lt = new Date(new Date(startTime).getTime() + 30 * 24 * 60 * 60 * 1000);
    }
    const filteredData = await Data.find(filter);
    res.json({ message: 'Filtered data', data: filteredData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
