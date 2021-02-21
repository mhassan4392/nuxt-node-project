const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReplySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  text: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Reply', ReplySchema)
