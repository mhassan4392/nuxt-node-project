// const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  dob: {
    type: Date
  },
  bio: {
    type: String
  },
  resetPasswordToken: String,
  resetPasswordTokenExpireDate: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)
