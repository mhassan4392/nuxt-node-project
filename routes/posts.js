const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchPosts, fetchPost, addPost, updatePost, deletePost, deletePosts, updatePostView } = require('../controllers/posts')

router.route('/')
  .get(fetchPosts)
  .post(isAuthenticated, addPost)

router.route('/delete')
  .post(isAuthenticated, deletePosts)

router.route('/:slug')
  .get(fetchPost)

router.route('/:id')
  .put(isAuthenticated, updatePost)
  .delete(isAuthenticated, deletePost)
router.route('/updateView/:slug')
  .put(updatePostView)

module.exports = router
