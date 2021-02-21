const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  comment: {
    type: Boolean,
    default: true
  },
  keywords: {
    type: String
  },
  description: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// reverse populate for comments
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  justOne: false
})

module.exports = mongoose.model('Post', PostSchema)
