const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('message', messageSchema);