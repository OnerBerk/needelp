const mongoose = require('mongoose')
const Schema = mongoose.Schema
const payment = require('./PaymentSch')
const supplier = require('./SupplierSch')
const service = require('./ServiceSch')

const PrestationSchema = new Schema({
 
    name: { type: String },
    
    date: { type: Date, default: Date.now },

    price: { type: Number },	
    
        
    payment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentSch' }],

    supplier: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupplierSch' }],

	service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceSch' }]
 
})

const Prestation = mongoose.model('Prestation', PrestationSchema)
module.exports = Prestation