const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');


exports.orderGet = (req,res, next) => {

    Order.find().populate('product').select('product _id quantity').exec()
        .then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
};

exports.orderCreate = (req, res, next) => {

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product:req.body.productId,
        quantity: req.body.quantity
    });
    order.save().then(result => {
        res.status(200).json(result);
        console.log(res);
    }).catch(err => { console.log(err); });
    res.status(201).json({
        message: 'Order was created',
        order: order
    });
};
