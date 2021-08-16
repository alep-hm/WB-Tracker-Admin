const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  ic: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  account: {
    type: Number,
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

  // bill: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Bill'
  // },

  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;