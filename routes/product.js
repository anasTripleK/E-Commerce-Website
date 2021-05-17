const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const fileUpload = require('../middleware/file-upload');

router.get('/', productController.getAllProducts);
router.post(
  '/',
  fileUpload.single('image'),
  authMiddleware,
  roleMiddleware('admin'),
  productController.createProduct
);
router.get('/:id', productController.getSingleProduct);
router.put(
  '/availability/:id',
  authMiddleware,
  roleMiddleware('admin'),
  productController.changeAvailability
);

module.exports = router;
