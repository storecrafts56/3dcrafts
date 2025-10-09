const express = require('express');
const { register, login, adminLogin, getMe } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', adminLogin);
router.get('/me', auth, getMe);

module.exports = router;