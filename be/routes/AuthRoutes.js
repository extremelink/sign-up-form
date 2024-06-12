const express = require('express');
const { signupUser, loginUser, getProfileInfoByCookie, logout } = require('../controllers/AuthController');
const router = express.Router();

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.get('/profile', getProfileInfoByCookie)
router.get('/logout',logout)


module.exports = router