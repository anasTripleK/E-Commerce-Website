const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

router.post('/', emailController.saveEmail);
router.post('/promotion', emailController.sendPromotionalEmail);

module.exports = router;
