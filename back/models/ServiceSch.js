const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    
    
    jobType: {type: String}
    
})

const Service = mongoose.model('Service', ServiceSchema)
module.exports = Service