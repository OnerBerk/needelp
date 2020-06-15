const express = require('express');
const app = express();
const Supplier = require('../models/SupplierSch');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require("dotenv");
const auth = require("../middlewares/auth");

dotenv.config();
app.use(express.json());

exports.updateProfile = async (req, res) => {
    console.log('body '+req.body)
    const id =  req.body.supplierId
    await bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        req.body.password = encrypted
        Supplier.findByIdAndUpdate(id, req.body, function(err, result){
            if(err) res.send(err)
            res.json('Supplier updated.')
        })
    })
}

exports.verifyAdmin = function (req, res, id) {
    return User.findById(id, function (err, user) {
        if(err) throw err;
        if(user.role == 'admin'){
            return 'admin'
        }
    })
}

exports.getAllProfile = (req, res) => {
    Supplier.find(function (err, supplier) {
        if(err) throw err;
        res.json(supplier)
    })
}

exports.getProfile = (req, res) => {
    console.log(req.params)
    const id =  req.params.supplierId
    console.log(id)
    Supplier.findById(id, function (err, user) {
        if(err) throw err;
        res.json(user)
    })
}