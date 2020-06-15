const express = require('express');
const app = express();
const cors = require('cors')
const Devis = require('../models/DevisSch')
const getdevisbyUser =  express.Router()
const dotenv = require("dotenv");
const getId = require("../middlewares/getId");

getdevisbyUser.use(cors())
dotenv.config();
app.use(express.json());



  
exports.getDevisbyUser = async (req, res) => 
{
    req.body.user =  getId.getId(req, res)
    const user = req.body.user

    Devis.find({user: user}, function(err,devis)
    {
        if(err) throw err;

        res.json(devis);
    })
}