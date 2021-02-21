// load Reply model
const Reply = require('../models/Reply')
const Comment = require('../models/Comment')

// fetch multiple replies
exports.fetchReplies = async (req, res) => {
  try {
    const replies = await Reply.find()
    const count = await Reply.countDocuments()
    return res
      .status(200)
      .json({
        success: true,
        replies,
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

// fetch commnet replies
exports.fetchCommentReplies = async (req, res) => {
  const id = req.params.id
  try {
    const replies = await Reply.find({ comment: id }).populate('comment')
    return res
      .status(200)
      .json({
        success: true,
        replies
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

// fetch single Reply
exports.fetchReply = (req, res) => {}

// add reply
exports.addReply = async (req, res) => {
  const { comment } = req.body
  try {
    const ecomment = await Comment.findById(comment)
    if (!ecomment) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.comments.commentNotFound'
        })
    }
    // create new reply
    await Reply.create(req.body)
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.replies.replyCreated'
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

// update reply
exports.updateReply = async (req, res) => {
  const { id } = req.params
  try {
    const reply = await Reply.findById(id)
    if (!reply) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.replies.replyNotFound'
        })
    }
    await Reply.findByIdAndUpdate(req.body)
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.replies.replyUpdated'
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

// delete reply
exports.deleteReply = async (req, res) => {
  const { id } = req.params
  try {
    // check if reply exist
    const reply = await Reply.findById(id)
    if (!reply) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.replies.replyNotFound'
        })
    }
    await reply.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.replies.replyRemoved'
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

// delete multiple replies
exports.deleteReplies = async (req, res) => {
  const replies = req.body
  try {
    for (let a = 0; a < replies.length; a++) {
      await Reply.findByIdAndRemove(replies[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.replies.repliesRemoved'
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
