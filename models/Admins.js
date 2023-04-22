const mongoose = require('mongoose');

const AdminsSchema = new mongoose.Schema({
  id: 'String',
  password: 'String',
  username: 'String',
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Admins', AdminsSchema);
