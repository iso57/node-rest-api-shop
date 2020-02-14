const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const  OrdersController = require('../controllers/orders');


router.get('/', OrdersController.orderGet);

router.post('/', OrdersController.orderCreate);

module.exports = router;
