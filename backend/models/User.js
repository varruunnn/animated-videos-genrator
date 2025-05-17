const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  name:      { type: String, default: '' },
  tokens:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
