const express = require('express')
const router = express.Router()

// auth middleware
const { isAuthenticated } = require('../middlewares/auth')

// load controllers
const {
  register,
  login,
  logout,
  getUser,
  getUsers,
  forgotPassword,
  resetPassword
} = require('../controllers/auth')

router.route('/register')
  .post(register)

router.route('/login')
  .post(login)

router.route('/logout')
  .post(logout)

router.route('/user')
  .get(isAuthenticated, getUser)

router.route('/users')
  .get(getUsers)

router.route('/forgot_password')
  .post(forgotPassword)

router.route('/reset_password/:token')
  .post(resetPassword)

module.exports = router
