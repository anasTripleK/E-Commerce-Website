const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

router.post(
  '/',
  authMiddleware,
  roleMiddleware('user'),
  orderController.addOrder
);

router.get(
  '/',
  authMiddleware,
  roleMiddleware('user'),
  orderController.getOrdersOfUser
);

router.get(
  '/all',
  authMiddleware,
  roleMiddleware('admin'),
  orderController.getAllOrders
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  orderController.changeToDeliveredStatus
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  orderController.cancelOrder
);

module.exports = router;
