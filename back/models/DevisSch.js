const mongoose = require('mongoose')
const Schema = mongoose.Schema
const payment = require('./PaymentSch')
const supplier = require('./SupplierSch')
const service = require('./ServiceSch')


const DevisSchema = new Schema({

    title: { type : String },

    content: { type: String },

    answer: {type: String},

    date: { type: Date, default: Date.now },

    photo: {type: String },

    statut: {type: String},

    daterdv: { type: String},

    price: { type:String },

    payment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentSch' }],

    supplier: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupplierSch' }],

    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserSch' }],

    service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceSch' }],
})

const Devis = mongoose.model('Devis', DevisSchema)
module.exports = Devis
