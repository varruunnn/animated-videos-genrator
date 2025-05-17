const express = require('express');
const { getProfile, updateProfile, changePassword } = require('../controllers/profileController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);
router.put('/password', auth, changePassword);

module.exports = router;
