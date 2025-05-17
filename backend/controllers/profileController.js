const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { name } = req.body;
  const user = await User.findById(req.user);
  if (name !== undefined) user.name = name;
  await user.save();
  res.json({ message: 'Profile updated', user });
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user);
  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) return res.status(400).json({ error: 'Current password incorrect.' });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
  res.json({ message: 'Password changed' });
};
