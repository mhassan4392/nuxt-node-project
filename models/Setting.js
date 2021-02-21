const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SettingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  settings: {
    type: mongoose.Schema.Types.Mixed
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Setting', SettingSchema)
