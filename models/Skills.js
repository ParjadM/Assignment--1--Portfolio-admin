const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: String,
  level: String, 
  technology: String
});

module.exports = mongoose.model('Skills', skillSchema);
