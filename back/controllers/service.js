const express = require('express');
const app = express();
const cors = require('cors')
const Supplier = require('../models/SupplierSch');
const supplier = express.Router()
const dotenv = require("dotenv");

supplier.use(cors())

dotenv.config();
app.use(express.json());

 exports.service = async(req, res) => {

  //console.log(req.body)
   //console.log(req.params)
   //console.log(req.query)

   Supplier.find ({service: req.body.service}, function(err,docs){
  if(!err) res.send(docs)

 })
 }
