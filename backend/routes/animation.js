const express = require('express');
const { generate } = require('../controllers/animationController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, generate);

module.exports = router;
