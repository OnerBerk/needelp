const express = require('express');
const app = express();
const Devis = require('../models/DevisSch')

app.use(express.json());

exports.updateQuote = async (req, res) => {
    console.log('body '+req.body)
    console.log(req.body.quoteId)
    const id =  req.body.quoteId
    Devis.findByIdAndUpdate(id, req.body, function(err, result){
        if(err) res.send(err)
        res.sendStatus(200)
    })
}

exports.getAllQuotes = (req, res) => {
    Devis.find(function (err, devis) {
        if(err) throw err;
        res.json(devis)
    })
}

exports.getQuote = (req, res) => {
    console.log(req.params)
    const id =  req.params.quoteId
    console.log(id)
    Devis.findById(id, function (err, quote) {
        if(err) throw err;
        res.json(quote)
    })
}

exports.deleteQuote = (req, res) => {
    const id =  req.params.quoteId
    Devis.findByIdAndDelete(id, req.body, function(err, result){
        if(err) res.send(err)
        res.clearCookie("token");
        res.sendStatus(200)
    })
}