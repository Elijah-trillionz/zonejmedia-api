const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
  id: 'String',
  name: 'String',
  unit: 'String',
  dateOfBirth: 'String',
  dept: 'String',
  schoolAddress: 'String',
  phoneNum: 'String',
  homeAddress: 'String',
  email: 'String',
  gender: 'String',
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Members', MembersSchema);
