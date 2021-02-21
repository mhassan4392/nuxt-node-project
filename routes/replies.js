const express = require('express')
const router = express.Router()

const { fetchReplies, addReply, updateReply, deleteReply, deleteReplies, fetchCommentReplies } = require('../controllers/replies')

router.route('/')
  .get(fetchReplies)
  .post(addReply)
  .delete(deleteReplies)

// router.route('/:slug')
//   .get(fetchReply)

router.route('/:id')
  .get(fetchCommentReplies)
  .put(updateReply)
  .delete(deleteReply)

module.exports = router
