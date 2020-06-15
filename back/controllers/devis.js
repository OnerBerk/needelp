const express = require('express');
const app = express();
const cors = require('cors')
const  Devis= require('../models/DevisSch');
const devis = express.Router()
const dotenv = require("dotenv");
const getId = require("../middlewares/getId");

devis.use(cors())
dotenv.config();
app.use(express.json());

 exports.devis = async(req, res) => 
 {
   req.body.user =  getId.getId(req, res)

    Devis.create({content: req.body.content,
      title:req.body.title,
      daterdv: req.body.startdate,
      supplier: req.body.supplierId,
      user: req.body.user,
      answer:'',
      price:'',
      statut:''
      }, function(err,docs)
    {
      if(!err) res.send(docs)
    })
 }

 exports.devisRes =async(req, res) => 
 {
   console.log(req.body._id)
   const id =  req.body._id;
   console.log('price '+req.body.statut)
   if(!req.body.statut){
     req.body.statut = ''
   }

   Devis.findByIdAndUpdate({ _id:id }, {price:req.body.price , answer:req.body.answer, statut:req.body.statut},function(err,result) 
    {
      if (err) 
      {
        console.log('Raté lol')
        res.send(err);
      } 
      else {
        console.log("WESH "+result)
        res.json(result);
        // console.log(result)
      }

    })
 }
