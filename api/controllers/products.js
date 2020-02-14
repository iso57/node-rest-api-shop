const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

exports.productDelete =  (req, res, next) => {
    Product.remove({_id: req.params.productId}).exec().then(result => res.status(200).json(result))
        .catch(error => console.log(error));

};
exports.productGetSingle =  (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec()
        .then(doc => {

            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(500).json({error: 'Document not found.'});
            }
        })
        .catch(erro => {
            res.status(500).json({error: erro});
            console.log(erro)
        });


};
exports.productCreate =  (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });


    product.save().then(res => {

        res.status(200).json({
            message: 'Handling post request worked',
            createdProduct: product,
            data: req.userData
        });
    }).catch(err => {
        console.log(err);
    });
};
exports.productUpdate = (req, res, next) => {
    const updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: req.params.productId}, { $set: updateOps}).exec()
        .then((result) => {
            console.log(result);

        }).catch(err => console.log(err));
    res.status(200).json({
        message: `Patch worked for the product ${req.params.productId}`
    })
};
exports.productGet = (req,res,next) => {
    Product.find().select('name price _id').exec()
        .then(result => {
            if (result) {
                const response = {
                    count: result.length,
                    products: result.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/products/'+  doc._id,
                            }
                        };
                    })
                };
                res.status(200).json({
                    result: response,
                    data: req.userData
                });
            } else {
                res.status(404).json({error: 'No entry found'});
            }

        })
        .catch(error => console.log(error));

};
