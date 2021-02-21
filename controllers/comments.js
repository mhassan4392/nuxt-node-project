// load comment model
const Comment = require('../models/Comment')
const Reply = require('../models/Reply')
const Post = require('../models/Post')

// fetch multiple comments
exports.fetchComments = async (req, res) => {
  try {
    const comments = await Comment.find()
    return res
      .status(200)
      .json({
        success: true,
        comments
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

// fetch post comments
exports.fetchPostComments = async (req, res) => {
  const id = req.params.id
  try {
    const comments = await Comment.find({ post: id }).populate('post').populate('replies')
    return res
      .status(200)
      .json({
        success: true,
        comments
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

// fetch single Comment
exports.fetchComment = (req, res) => {}

// add comment
exports.addComment = async (req, res) => {
  const { post } = req.body
  try {
    const epost = await Post.findById(post)
    if (!epost) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.posts.postNotFound'
        })
    }
    // create new comment
    await Comment.create(req.body)
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.comments.commentCreated'
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

// update comment
exports.updateComment = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findById(id)
    if (!comment) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.comments.commentNotFound'
        })
    }
    await Comment.findByIdAndUpdate(req.body)
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.comments.commentUpdated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: true,
        message: 'errorMessages.somethingWentWrong'
      })
  }
}

// delete comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params
  try {
    // check if comment exist
    const comment = await Comment.findById(id)
    const replies = await Reply.find({ comment: comment._id })
    replies.forEach(async (reply) => {
      await reply.remove()
    })

    if (!comment) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.comments.commentNotFound'
        })
    }
    await comment.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.comments.commentRemoved'
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

// delete multiple comments
exports.deleteComments = async (req, res) => {
  const comments = req.body
  try {
    for (let a = 0; a < comments.length; a++) {
      const replies = await Reply.find({ comment: comments[a] })
      for (let b = 0; a < replies.length; b++) {
        await replies[a].remove()
      }
      await comments[a].remove()
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'errorMessages.comments.commentsRemoved'
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
