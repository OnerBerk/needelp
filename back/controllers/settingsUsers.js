const express = require('express');
const app = express();
const User = require('../models/UserSch')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const getId = require("../middlewares/getId");

app.use(express.json());


exports.updateProfile = (req, res) => {
    id =  getId.getId(req, res)
    bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        req.body.password = encrypted
        User.findByIdAndUpdate(id, req.body, function(err, result){
            if(err) res.send(err)
            res.json('User updated.')
        })
    })
}

exports.deleteProfile = (req, res) => {
    id =  getId.getId(req, res)
    User.findByIdAndDelete(id, req.body, function(err, result){
        if(err) res.send(err)
        res.clearCookie("token");
        res.json({message: result.firstname+' '+result.lastname+" deleted!"})
    })
}

exports.getProfile = (req, res) => {
    id = getId.getId(req, res)
    User.findById(id, function (err, user) {
        if(err) throw err;
        res.json(user)
    })
}