const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, userController.getUser);
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.post('/valid', userController.checkTokenValidity);
router.post('/createadmin', userController.createAdmin);

module.exports = router;
