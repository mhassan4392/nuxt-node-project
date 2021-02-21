const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchPages, fetchPage, addPage, updatePage, deletePage, deletePages } = require('../controllers/pages')

router.route('/')
  .get(fetchPages)
  .post(isAuthenticated, addPage)

router.route('/delete')
  .post(isAuthenticated, deletePages)

router.route('/:slug')
  .get(fetchPage)

router.route('/:id')
  .put(isAuthenticated, updatePage)
  .delete(isAuthenticated, deletePage)

module.exports = router
