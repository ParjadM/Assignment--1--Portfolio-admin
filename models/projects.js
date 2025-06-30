const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technology: String
});

module.exports = mongoose.model('Projects', projectSchema);
