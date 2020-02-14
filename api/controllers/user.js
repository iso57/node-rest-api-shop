const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


exports.userGet =  (req, res, next) => {

    User.find().select('email password _id').exec()
        .then(result => {
            res.status(200).json(result);

        }) .catch(error => {

        res.status(501).json(error);
    });
};

exports.userDelete = (req, res, next) => {
    User.remove({_id: req.params.userId}).exec()
        .then(result => {

            res.status(203).json(result);
        }).catch(error => {
        res.status(501).json(error);
    })

};

exports.userSignUp = (req, res, next) => {
    User.find({_email: req.body.email}).exec()
        .then(user => {
            console.log(user);
            if (user.length > 0) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            }  else {
                bcrypt.hash(req.body.password,10, (error, hash) => {
                    console.log(req.body.email);
                    if (!error) {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then(result => {
                            res.status(200).json(result);

                        }).catch(err => {
                            res.status(404).json(err);
                        })
                    }
                }) ;

            }
        })
        .catch((err) => {

            console.log(err);
        });

};

exports.userLogin =  (req, res, next) => {

    User.find({email: req.body.email}).exec().then(result => {

        if (result.length > 0)
        {
            bcrypt.compare(req.body.password, result[0].password, (err, resultat) => {

                if (err) {
                    console.log(err);
                }
                if (resultat) {
                    const token = jwt.sign({
                        email: result[0].email,
                        userId: result[0]._id,

                    },"KEYTEST",{
                        expiresIn:"1h",

                    });

                    return res.status(200).json({
                        message: 'Auth succesful',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            } );
        }
        else {
            return res.status(401).json({error: 'Auth failed'});
        }
    }).catch(err => console.log(err));
};
