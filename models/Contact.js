const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  translation: {
    type: String
  },
  slug: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Address', AddressSchema)
