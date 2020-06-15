const express = require('express');
const app = express();
const Comment = require('../models/CommentSch')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require("dotenv");
const auth = require("../middlewares/auth");

dotenv.config();
app.use(express.json());

exports.createComment = async (req,res, next) => {
        const comment = new Comment(req.body);
        comment.save();
        res.status(200).json({ message: "Comment complete." });
    }

exports.getAllComments = (req, res) => {
    Comment.find(function (err, comment) {
        if(err) throw err;
        res.json(comment);
    })
}

exports.getComment = (req, res) => {
    console.log(req.params);
    const id =  req.params.commentId;
    console.log(id);
    Comment.findById(id, function (err, comment) {
        if(err) throw err;
        res.json(comment);
    })
}

exports.updateComment = async (req, res) => {
    console.log('body '+req.body);
    console.log(req.body.commentId);
    const id =  req.body.commentId;
    await bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        req.body.password = encrypted;
        Comment.findByIdAndUpdate(id, req.body, function(err, result){
            if(err) res.send(err);
            res.json('Comment updated.');
        })
    })
}