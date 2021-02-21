const express = require('express')
const router = express.Router()

// auth middleware
const { isAuthenticated } = require('../middlewares/auth')

// load controllers
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteUsers
} = require('../controllers/users')

router.route('/:id')
  .get(isAuthenticated, getUser)
  .put(isAuthenticated, updateUser)
  .delete(isAuthenticated, deleteUser)

router.route('/delete')
  .post(isAuthenticated, deleteUsers)

router.route('/')
  .get(getUsers)

module.exports = router
