const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('Admin', UserSchema)
