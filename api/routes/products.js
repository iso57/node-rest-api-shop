const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');
const upload = multer({dest: '/uploads/'});
router.get('/',checkAuth, productController.productGet);

router.delete('/:productId', productController.productDelete);
router.patch('/:productId', productController.productUpdate);
router.get('/:productId', productController.productGetSingle);
router.post('/', checkAuth, productController.productCreate);

module.exports = router;
