const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});
module.exports = Email = mongoose.model('email', emailSchema);
