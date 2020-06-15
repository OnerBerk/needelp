const express = require('express');
const app = express();
const User = require('../models/UserSch')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require("dotenv");
const auth = require("../middlewares/auth");

dotenv.config();
app.use(express.json());

exports.updateProfile = async (req, res) => {
    console.log('body '+req.body)
    console.log(req.body.userId)
    const id =  req.body.userId
    await bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        req.body.password = encrypted
        User.findByIdAndUpdate(id, req.body, function(err, result){
            if(err) res.send(err)
            res.json('User updated.')
        })
    })
}

exports.verifyAdmin = function (req, res, id) {
    console.log("admin verify id",id);
    return User.findById(id, function (err, user) {
        if(err) throw err;
        if(user.role !== 'admin'){
            res.status(401).json({
                error: new Error('Invalid request!')
              })
        }
    })
}

exports.getAllProfile = (req, res) => {
    User.find(function (err, user) {
        if(err) throw err;
        res.json(user)
    })
}

exports.getProfile = (req, res) => {
    console.log(req.params)
    const id =  req.params.userId
    console.log(id)
    User.findById(id, function (err, user) {
        if(err) throw err;
        res.json(user)
    })
}