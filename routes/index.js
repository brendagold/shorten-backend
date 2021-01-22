const express = require('express');
const UserController = require('../controllers/UserController');
const CodeController = require('../controllers/CodeController');
const LoginController = require('../controllers/LoginController');
const verifyToken = require('../config/verifyToken');

const router = express.Router();

//Login

router.post('/login', LoginController.store);

//User
router.post('/user/register', UserController.createUser);
router.get('/user/:userId', UserController.getUserById);

//Code
router.post('/createcode', CodeController.createCode);

router.get('/checkcode', CodeController.checkCode);

module.exports = router;
