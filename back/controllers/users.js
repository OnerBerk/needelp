const express = require('express');
const app = express();
const User = require('../models/UserSch')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const auth = require("../middlewares/auth");
const getId = require("../middlewares/getId");

dotenv.config();
app.use(express.json());


exports.register = async (req,res, next) => {
    req.body.role = 'user'
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
        return res.status(403).json({
            error: "This email is already used."
        });
    }
    await bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        req.body.password = encrypted
        const user = new User(req.body)
        user.save()
        res.status(200).json({ message: "Registration complete." });
    })
};

exports.login = (req, res) => {
    console.log('login')
    console.log(req.body)
    const { email, password } = req.body
    console.log(email)
    User.findOne({email}, (err, user) => {
        
        if (err || !user){
            return res.status(400).json({
                error: "Email doesn't exist."
            })
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            console.log(result)
            if(result == false){
                return res.status(400).json({
                    error: "Email doesn't exist."
                })
            }
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '24h' });            
            const {_id, name, email} = user
            return res.json({user: {_id, email, name}, token: token});
        });
    });  
};

exports.getUserFromId = function (req, res, id) {
    return User.findById(id, function (err, user) {
        if(err) throw err;
    })
}