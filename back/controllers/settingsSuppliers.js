const express = require('express');
const app = express();
const Supplier = require('../models/SupplierSch')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const getId = require("../middlewares/getId");

app.use(express.json());


exports.updateProfile = (req, res) => {
    id =  getId.getId(req, res)
    bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        req.body.password = encrypted
        Supplier.findByIdAndUpdate(id, req.body, function(err, result){
            if(err) res.send(err)
            res.json('User updated.')
        })
    })
}

exports.deleteProfile = (req, res) => {
    id =  getId.getId(req, res)
    Supplier.findByIdAndDelete(id, req.body, function(err, result){
        if(err) res.send(err)
        res.clearCookie("token");
        res.json({message: result.firstname+' '+result.lastname+" deleted!"})
    })
}

exports.getOwnProfile = (req, res) => {
    id = getId.getId(req, res)
    Supplier.findById(id, function (err, supplier) {
        if(err) throw err;
        res.json(supplier)
    })
}

exports.getProfile = (req, res) => {
    // console.log(req.params)
    const id =  req.params.supplierId
    console.log("id du setting",id)
    Supplier.findById(id, function (err, supplier) {
        if(err) throw err;
        res.json(supplier)
    })
}