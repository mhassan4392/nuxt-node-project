const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')

// load user model
const User = require('../models/User')
const moment = require('moment')

// update user
exports.updateUser = async (req, res) => {
  delete req.body['role._id']
  delete req.body['role.title']
  delete req.body['role.slug']
  delete req.body['role.created']
  delete req.body['role.__v']
  delete req.body['role.pagePermissions']
  const id = req.params.id
  try {
    // check if user exist with req email
    let user = await User.findById(id)
    // if user not exist return error
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'errorMessages.users.userNotExist'
      })
    }

    let message = 'successMessages.users.profileUpdated'

    // check if password exist
    if (req.body.password) {
      // if user exists match password with the record password
      const isMatch = await bcrypt.compare(req.body.oldPassword, user.password)
      // if password not match return error
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'errorMessages.users.oldPasswordNotMatch'
        })
      }
      // hashed the password
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(req.body.password, salt)
      const hashedPassword = hash
      req.body.password = hashedPassword

      message = 'successMessages.users.credentialsUpdated'
    }

    // check if avatar exist
    const avatar = req.files ? req.files.avatar : null
    if (avatar) {
      if (!avatar.mimetype.startsWith('image')) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.plzUploadImage'
          })
      }
      if (avatar.size > 2048000) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.imageSize'
          })
      }
      if (!fs.existsSync(process.env.FILE_UPLOAD_LOACTION + '/users')) {
        fs.mkdirSync(process.env.FILE_UPLOAD_LOACTION + '/users')
      }
      const preAvatar = process.env.FILE_UPLOAD_LOACTION + '/users/' + user.avatar
      if (fs.existsSync(preAvatar)) {
        fs.unlinkSync(preAvatar)
      }
      avatar.name = `${user._id}${path.parse(avatar.name).ext}`
      avatar.mv(`${process.env.FILE_UPLOAD_LOACTION}/users/${avatar.name}`, err => {
        if (err) {
          return res
            .status(400)
            .json({
              success: false,
              message: 'errorMessages.image.uploadImageError',
              err
            })
        }
      })
      req.body.avatar = avatar.name
      message = 'successMessages.users.profilePictureUpdated'
    }

    user = await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })

    user = await User.findById(id).select('-password').populate('role')

    if (user.dob) {
      user.dob = moment(user.dob).format('YYYY-MM-DD')
    }

    return res
      .status(200)
      .json({
        success: true,
        message: message,
        user
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

// get single user
exports.getUser = async (req, res) => {
  const id = req.params.id
  try {
    // get authenticated user from req user
    const user = await User.findById(id).select('-password').populate('role')
    return res.status(200).json({
      success: true,
      user
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

// get multiple users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('role')
    return res
      .status(200)
      .json({
        success: false,
        users
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

// delete user
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    const reqUser = await User.findById(req.user).populate('role')
    if (reqUser.role.title === 'admin') {
      const avatar = process.env.FILE_UPLOAD_LOACTION + '/users/' + user.image
      if (fs.existsSync(avatar)) {
        fs.unlinkSync(avatar)
      }
      await user.remove()
    }

    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.users.userRemoved'
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

// delete multiple users
exports.deleteUsers = async (req, res) => {
  const users = req.body
  try {
    for (let a = 0; a < users.length; a++) {
      const preUser = await User.findById(users[a])
      await User.findByIdAndRemove(users[a], { useFindAndModify: false })
      if (preUser.avatar) {
        const preAvatar = process.env.FILE_UPLOAD_LOACTION + '/users/' + preUser.avatar
        if (fs.existsSync(preAvatar)) {
          fs.unlinkSync(preAvatar)
        }
      }
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.users.usersRemoved'
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
