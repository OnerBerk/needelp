const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  
    zip: {type: Number },
    
    city: { type: String},
    
    date: { type: Date, default: Date.now }
    
});

const location = mongoose.model('location', LocationSchema);
module.exports = location;