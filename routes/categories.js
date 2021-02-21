const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchCategories, fetchCategory, addCategory, updateCategory, deleteCategory, deleteCategories } = require('../controllers/categories')

router.route('/')
  .get(fetchCategories)
  .post(isAuthenticated, addCategory)
  .delete(isAuthenticated, deleteCategories)

router.route('/delete')
  .post(isAuthenticated, deleteCategories)

router.route('/:slug')
  .get(fetchCategory)

router.route('/:id')
  .put(isAuthenticated, updateCategory)
  .delete(isAuthenticated, deleteCategory)

module.exports = router
