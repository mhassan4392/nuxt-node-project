const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchIcons, fetchIcon, addIcon, updateIcon, deleteIcon, deleteIcons } = require('../controllers/icons')

router.route('/')
  .get(fetchIcons)
  .post(isAuthenticated, addIcon)

router.route('/delete')
  .post(isAuthenticated, deleteIcons)

router.route('/:id')
  .get(fetchIcon)

router.route('/:id')
  .put(isAuthenticated, updateIcon)
  .delete(isAuthenticated, deleteIcon)

module.exports = router
