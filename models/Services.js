const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  id: 'String',
  title: 'String',
  attendance: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
