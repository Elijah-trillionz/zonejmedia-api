const mongoose = require('mongoose');

const UnitsSchema = new mongoose.Schema({
  id: 'String',
  name: 'String',
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Units', UnitsSchema);
