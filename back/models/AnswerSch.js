const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user = require('./UserSch')
const supplier = require('./SupplierSch')


const AnswerSchema = new Schema({
 
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommentSch' },

    answer: { type: String },
    
    commentedBy: { type: String},

    date: { type: Date, default: Date.now },
    
})
const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer