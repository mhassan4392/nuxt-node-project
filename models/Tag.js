const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Tag', TagSchema)
