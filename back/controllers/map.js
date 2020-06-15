const express = require('express');
const app = express();
const cors = require('cors')
const Supplier = require('../models/SupplierSch');
const mapCoordonate = express.Router()
const dotenv = require("dotenv");

mapCoordonate.use(cors())
dotenv.config();
app.use(express.json());




exports.mapCoordonate = async(req, res) =>
{
    console.log("c'est moi", req.body)
    console.log(req.body.params.supplierId)
    const supplierId = req.body.params.supplierId
    console.log(supplierId)

    Supplier.findById({_id:supplierId}, function(err,docs)
    {
       if(err) {
            return res.send("erreur de recupeation ")
            console.log(err)
        }
        res.send(docs)
        console.log("supplier recuperer",docs)
    })
}