const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

  lastname: { type: String },

  firstname: { type: String },

  password: { type: String, required: true },
  
  address: {type: String },
  
  photo: {type: String },
  
  phone: {type: String},
  
  email: { type: String, required: true },
  
  date: { type: Date, default: Date.now },

  role: { type: String, default: 'user'}

})

const User = mongoose.model('User', UserSchema)
module.exports =  User