const express = require('express');
const app = express();
const cors = require('cors')
const Devis = require('../models/DevisSch');
const getdevis = express.Router()
const getdevisbyid = express.Router()
const dotenv = require("dotenv");

getdevis.use(cors())
getdevisbyid.use(cors())

dotenv.config();
app.use(express.json());

 exports.getdevis = async(req, res) => 
 {
//   console.log("je suis la ", req.body.params)
  let id = req.body.params

   Devis.find ({supplier:req.body.params},function(err,docs){
    if(!err) res.send(docs)
     console.log(docs)

 })
 }

 exports.getdevisbyid = async (req, res) => {
    
    console.log("params Req", req)
    
    let id = req.body.params
  
     Devis.findById ( id , function(err,docs){
      if(!err) res.send(docs)
       console.log(docs)
  
   }
   )
   }
    //  id = getId.getId(req.res) 
    //  Devis.findById(id, function(err, devis){
    //     if(!err) res.json(devis)

    //  })