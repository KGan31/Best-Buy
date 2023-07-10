const express = require('express');
const {loginUser, signupUser} = require('../controllers/userController');
const router = express.Router();

// Login Route
router.post('/login', loginUser);

// Signup Route
router.post('/signup', signupUser);

module.exports = router;