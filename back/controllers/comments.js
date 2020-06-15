const express = require('express');
const app = express();
const Comment = require('../models/CommentSch')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require("dotenv");
const getId = require("../middlewares/getId");
const users = require('./users');
const Answer = require('../models/AnswerSch')

dotenv.config();
app.use(express.json());

exports.createComment = async (req,res, err) => {
     
    // console.log("Body BACK: ", req.body)
    const id = getId.getId(req, res);
    req.body.user = users.getUserFromId(req, res, id) 
    req.body.user
    .then((result) => {
    req.body.user = result.firstname + " " + result.lastname
    const comment = new Comment(req.body);
    comment.save();
    res.status(200).json({ message: "Comment complete." });
    })
    .catch(err)
}

exports.getAllComments = (req, res) => {
    // console.log("get all comment", res  )
    Comment.find(function (err, comment)
     {
        if(err) throw err;
        res.json(comment);
        console.log("Get all comments succed")
    })    
}


exports.getCommentsbySupplier = (req, res) => {
    Comment.find({supplier: req.params.supplierId})
       .exec((err, comments) => {
        if (err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(comments);              
    });
};


exports.updateComment = async (req, res) => {

    const id =  req.body.commentId;
    await bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        req.body.password = encrypted;
        Comment.findByIdAndUpdate(id, req.body, function(err, result){
            if(err) res.send(err);
            res.json('Comment updated.');
        })
    })
}

exports.answerComment = async (req,res, err) => {
    console.log('Id du fucking commentaire de mes deux :', req.params.commentId);
    req.body.commentId = req.params.commentId
    
    const id = getId.getId(req, res);
    req.body.commentedBy = users.getUserFromId(req, res, id) 
    req.body.commentedBy
    .then((result) => {
    req.body.commentedBy = result.firstname + " " + result.lastname
    console.log("commented by :", req.body.commentedBy)
    const answer = new Answer(req.body);
    answer.save();
    res.status(200).json({ message: "Comment complete." });
    })
    .catch(err)
    }
exports.getAllAnswersByCommentId  = (req, res, err) => {
     
     Answer.find(function (err, answer)
     {
        if(err) throw err;
        res.json(answer);
        console.log("Get all comments succeed")
    })    
}
