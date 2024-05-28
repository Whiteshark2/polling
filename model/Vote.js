const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
  option: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Vote', VoteSchema);
