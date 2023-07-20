const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
});

module.exports = mongoose.model('Contact', ContactSchema);
