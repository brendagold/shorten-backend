const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  code: Number,
});

module.exports = mongoose.model('Code', CodeSchema);
