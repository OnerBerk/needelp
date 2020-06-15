const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema = new Schema({
 
    date: { type: Date, default: Date.now },
    
    price: {type: Number },
    
    devis: { type: String},
    
    statut: {type: String},
    
})
const Payment = mongoose.model('Payment', PaymentSchema)
module.exports = Payment