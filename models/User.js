const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model('user', UserSchema);
