// const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  pagePermissions: {
    type: Array,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Role', RoleSchema)
