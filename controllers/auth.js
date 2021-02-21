const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// load user model
const User = require('../models/User')

// load sendMail utils
const sendMail = require('../utils/sendMail')

// register new user
exports.register = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'errorMessages.auth.userAlreadyExistWithEmail'
      })
    }

    // hashed the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    req.body.password = hash

    // if user not exist than create new user
    await User.create(req.body)

    // return success response
    return res.status(200).json({
      success: false,
      message: 'successMessages.auth.userRegisterd'
    })
  } catch (e) {
    // return error response
    return res.status(400).json({
      success: false,
      error: e,
      message: 'errorMessages.somethingWentWrong'
    })
  }
}

// login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    // check if user exist with req email
    const user = await User.findOne({ email })
    // if user not exist return error
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'errorMessages.auth.userNotExist'
      })
    }

    // if user exists match password with the record password
    const isMatch = await bcrypt.compare(password, user.password)
    // if password not match return error
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'errorMessages.auth.passwordNotMatch'
      })
    }

    // if password match then get the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    })
    // now send user and token

    return res.status(200).json({
      success: true,
      token,
      user
    })
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
      message: 'errorMessages.somethingWentWrong'
    })
  }
}

// logout
exports.logout = async (req, res) => {
  req.user = null
  return res.status(200).json({
    success: true
  })
}

// get single user
exports.getUser = async (req, res) => {
  try {
    // get authenticated user from req user
    const user = await User.findById(req.user).select('-password').populate('role')
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}

// get multiple users
exports.getUsers = async (req, res) => {}

// forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    // check if user exist with the req email
    const user = await User.findOne({ email })
    // if user not found send error
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.auth.userNotExist'
        })
    }
    // if user exists then send the email for resetting

    const resetToken = await crypto.randomBytes(20).toString('hex')

    user.resetPasswordToken = await crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    user.resetPasswordTokenExpireDate = await (Date.now()) + 10 * 60 * 1000

    // now save the user
    await user.save()

    // now send the email to the user for password reset
    const text = `
      Please reset your password by going to this mail \n
      ${req.protocol}://${req.get('host')}/auth/reset/password/${resetToken}
    `
    const html = `
      <p>Please reset your password by going to this mail</p> 
      <a href="${req.protocol}://${req.get('host')}/auth/reset/password/${resetToken}">Click Here</a>
    `
    const options = {
      email,
      from: process.env.SMTP_EMAIL,
      subject: 'Reset Password',
      message: text,
      html: html
    }

    // send token email
    await sendMail(options)

    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.auth.resetPasswordMailSent'
      })
  } catch (error) {
    console.log(error)

    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}

// reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params
  const resetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken
    })
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.auth.notAuthorized'
        })
    }

    const userTokenExpiry = await User.findOne({
      resetPasswordTokenExpireDate: { $gt: Date.now() }
    })

    if (!userTokenExpiry) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.auth.tokenExpired'
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    const hashedPassword = hash
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.tokenExpireDate = undefined
    await user.save()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.auth.passwordReset'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}
