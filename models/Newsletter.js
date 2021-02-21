const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Newsletter', NewsletterSchema)
