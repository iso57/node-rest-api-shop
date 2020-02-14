const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');
router.get('/', userController.userGet);
router.delete('/:userId', userController.userDelete);
router.post('/signup', userController.userSignUp);

router.post('/login', userController.userLogin);

module.exports = router;
