const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  excerpt: {
    type: String
  },
  status: {
    type: String,
    enum: ['published', 'draft']
  },
  keywords: {
    type: String
  },
  description: {
    type: String
  },
  showSidebar: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Page', PageSchema)
