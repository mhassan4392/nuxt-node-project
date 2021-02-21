const express = require('express')
const router = express.Router()

const { fetchComments, addComment, updateComment, deleteComment, deleteComments, fetchPostComments } = require('../controllers/comments')

router.route('/')
  .get(fetchComments)
  .post(addComment)
  .delete(deleteComments)

// router.route('/:slug')
//   .get(fetchComment)

router.route('/:id')
  .put(updateComment)
  .get(fetchPostComments)
  .delete(deleteComment)

module.exports = router
