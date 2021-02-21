// load post model
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Reply = require('../models/Reply')
const Category = require('../models/Category')
const Tag = require('../models/Tag')
// load slugify
const { default: slugify } = require('slugify')

const path = require('path')
const fs = require('fs')

// fetch multiple posts
exports.fetchPosts = async (req, res) => {
  const query = req.query
  // find posts with category query
  if (query.category) {
    const category = await Category.findOne({ slug: query.category })
    if (category) {
      query.category = category._id
    }
  }
  // find posts with tags query
  if (query.tag) {
    const tag = await Tag.findOne({ slug: query.tag })
    if (tag) {
      query.tags = { $all: [tag._id] }
      delete query.tag
    }
  }
  // find posts with search query
  if (query.search) {
    query.title = query.search
    // query.body = query.search
    // query.excerpt = query.search

    delete query.search
  }

  const limit = Number(query.limit) || 2
  const page = query.page || 1
  const sort = query.sort || '-created'

  const removeQueries = ['limit', 'page', 'populate', 'sort']

  // delete the queries we want
  removeQueries.forEach((q) => delete query[q])

  try {
    const posts = await Post.find(query)
      .populate('category')
      .populate('tags')
      .populate({
        path: 'comments',
        populate: [
          { path: 'user', select: 'name email' },
          { path: 'post', select: 'slug' },
          { path: 'replies', populate: { path: 'user', select: 'name' } }
        ]
      })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort)
    const count = await Post.countDocuments(query)

    return res
      .status(200)
      .json({
        success: true,
        posts,
        count
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error: e
      })
  }
}

// fetch single post
exports.fetchPost = async (req, res) => {
  const { slug } = req.params
  const { populate } = req.query
  try {
    let post
    if (populate) {
      post = await Post.findOne({ slug })
        .populate('category')
        .populate('tags')
        .populate({
          path: 'comments',
          populate: [
            { path: 'user' },
            { path: 'post', select: 'slug' },
            { path: 'replies', populate: { path: 'user' } }
          ]
        })
    } else {
      post = await Post.findOne({ slug })
    }
    if (!post) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.posts.postNotFound'
        })
    }
    return res
      .status(200)
      .json({
        success: true,
        post
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error: e
      })
  }
}

// add post
exports.addPost = async (req, res) => {
  const slug = slugify(req.body.title)
  const newPost = req.body
  newPost.user = req.user
  newPost.tags = req.body.tags
  newPost.slug = slug
  try {
    const post = await Post.findOne({ slug: slug })
    if (post) {
      return res
        .status(400)
        .json({
          success: true,
          message: 'errorMessages.posts.postAlreadyExist'
        })
    }
    const avatar = req.files ? req.files.avatar : null
    if (avatar) {
      if (!avatar.mimetype.startsWith('image')) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.plzUploadImage'
          })
      }
      if (avatar.size > 2048000) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.imageSize'
          })
      }
      if (!fs.existsSync(process.env.FILE_UPLOAD_LOACTION + '/posts')) {
        fs.mkdirSync(process.env.FILE_UPLOAD_LOACTION + '/posts')
      }
      avatar.name = `${newPost.slug}${path.parse(avatar.name).ext}`
      avatar.mv(`${process.env.FILE_UPLOAD_LOACTION}/posts/${avatar.name}`, err => {
        if (err) {
          return res
            .status(400)
            .json({
              success: false,
              message: 'errorMessages.image.uploadImageError',
              err
            })
        }
      })
      newPost.avatar = avatar.name
    }
    await Post.create(newPost)
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.posts.postCreated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}

// update post
exports.updatePost = async (req, res) => {
  const { id } = req.params
  const updatePost = req.body
  const slug = slugify(updatePost.title)
  updatePost.slug = slug
  updatePost.tags = req.body.tags
  try {
    const post = await Post.findOne({ slug })
    if (post) {
      if (String(post._id) !== String(id)) {
        return res
          .status(400)
          .json({
            success: true,
            message: 'errorMessages.posts.postAlreadyExist'
          })
      }
    }
    const avatar = req.files ? req.files.avatar : null
    if (avatar) {
      if (!avatar.mimetype.startsWith('image')) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.plzUploadImage'
          })
      }
      if (avatar.size > 2048000) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.imageSize'
          })
      }
      if (!fs.existsSync(process.env.FILE_UPLOAD_LOACTION + '/posts')) {
        fs.mkdirSync(process.env.FILE_UPLOAD_LOACTION + '/posts')
      }
      const post = await Post.findById(id)
      const preAvatar = process.env.FILE_UPLOAD_LOACTION + '/posts/' + post.avatar
      if (fs.existsSync(preAvatar)) {
        fs.unlinkSync(preAvatar)
      }
      avatar.name = `${updatePost.slug}${path.parse(avatar.name).ext}`
      avatar.mv(`${process.env.FILE_UPLOAD_LOACTION}/posts/${avatar.name}`, err => {
        if (err) {
          return res
            .status(400)
            .json({
              success: false,
              message: 'errorMessages.image.imageUploadError',
              err
            })
        }
      })
      updatePost.avatar = avatar.name
    }
    await Post.findByIdAndUpdate(id, updatePost, {
      useFindAndModify: false
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.posts.postUpdated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}

exports.updatePostView = async (req, res) => {
  const { slug } = req.params
  try {
    const post = await Post.findOne({ slug })
    if (!post) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.posts.postNotFound'
        })
    }
    post.views += 1
    await Post.findByIdAndUpdate(post._id, post, {
      useFindAndModify: false
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.posts.viewUpdated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}

// delete post
exports.deletePost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    const comments = await Comment.find({ post: post })
    comments.forEach(async (comment) => {
      const replies = await Reply.find({ comment: comment._id })
      replies.forEach(async (reply) => {
        await reply.remove()
      })
      await comment.remove()
    })
    const avatar = process.env.FILE_UPLOAD_LOACTION + '/posts/' + post.avatar
    if (fs.existsSync(avatar)) {
      fs.unlinkSync(avatar)
    }
    await post.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.posts.postRemoved'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}

// delete multiple posts
exports.deletePosts = async (req, res) => {
  const posts = req.body
  try {
    for (let a = 0; a < posts.length; a++) {
      const findPost = await Post.findById(posts[a])
      const comments = await Comment.find({ post: posts[a] })
      for (let b = 0; b < comments.length; b++) {
        const replies = await Reply.find({ comment: comments[b]._id })
        for (let c = 0; c < replies.length; c++) {
          await replies[c].remove()
        }
        await comments[b].remove()
      }
      const avatar = process.env.FILE_UPLOAD_LOACTION + '/posts/' + findPost.avatar
      if (fs.existsSync(avatar)) {
        fs.unlinkSync(avatar)
      }
      await Post.findByIdAndRemove(posts[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.posts.postsRemoved'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error: error
      })
  }
}
