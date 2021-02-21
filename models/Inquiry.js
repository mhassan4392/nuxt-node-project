const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InquirySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Inquiry', InquirySchema)
