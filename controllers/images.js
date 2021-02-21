const Image = require('../models/Image')
const path = require('path')
const fs = require('fs')
// load slugify
const { default: slugify } = require('slugify')

// get all images
exports.fetchImages = async (req, res, next) => {
  try {
    const images = await Image.find()
    return res
      .status(200)
      .json({
        success: true,
        count: images.length,
        images
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
exports.fetchImage = async (req, res, next) => {}

// add new image
exports.addImage = async (req, res, next) => {
  const newImage = req.body
  newImage.slug = slugify(req.body.title)
  try {
    const preImage = await Image.findOne({ title: newImage.titile })
    if (preImage) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.images.imageAlreadyExist'
        })
    }
    const image = req.files ? req.files.image : null
    if (image) {
      if (!image.mimetype.startsWith('image')) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.plzUploadImage'
          })
      }
      if (image.size > 2048000) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.imageSize'
          })
      }
      if (!fs.existsSync(process.env.FILE_UPLOAD_LOACTION + '/images')) {
        fs.mkdirSync(process.env.FILE_UPLOAD_LOACTION + '/images')
      }
      const newName = newImage.slug
      image.name = `${newName}${path.parse(image.name).ext}`
      image.mv(`${process.env.FILE_UPLOAD_LOACTION}/images/${image.name}`, err => {
        if (err) {
          return res
            .status(400)
            .json({
              success: false,
              message: 'errorMessages.image.imageUploadError',
              err
            })
        }
      })
      newImage.image = image.name
    }
    await Image.create(newImage)
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.images.imageCreated'
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

// update image
exports.updateImage = async (req, res, next) => {
  const { id } = req.params
  const updateImage = req.body
  updateImage.slug = slugify(req.body.title)
  try {
    const preImage = await Image.findById(id)
    const newType = await Image.findOne({ type: updateImage.type })
    if (newType) {
      if (newType.type !== preImage.type) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.images.imageAlreadyExist'
          })
      }
    }
    const image = req.files ? req.files.image : null
    if (image) {
      if (!image.mimetype.startsWith('image')) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.plzUploadImage'
          })
      }
      if (image.size > 2048000) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.imageSize'
          })
      }
      if (!fs.existsSync(process.env.FILE_UPLOAD_LOACTION + '/images')) {
        fs.mkdirSync(process.env.FILE_UPLOAD_LOACTION + '/images')
      }
      const preAvatar = process.env.FILE_UPLOAD_LOACTION + '/images/' + preImage.image
      if (fs.existsSync(preAvatar)) {
        fs.unlinkSync(preAvatar)
      }
      const newName = updateImage.slug
      image.name = `${newName}${path.parse(image.name).ext}`
      image.mv(`${process.env.FILE_UPLOAD_LOACTION}/images/${image.name}`, err => {
        if (err) {
          return res
            .status(400)
            .json({
              success: false,
              message: 'errorMessages.image.imageUploadError',
              err
            })
        }
      })
      updateImage.image = image.name
    }
    await Image.findByIdAndUpdate(id, updateImage, {
      useFindAndModify: false
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.images.imageCreated'
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

// delete image
exports.deleteImage = async (req, res, next) => {
  const { id } = req.params
  try {
    const image = await Image.findById(id)
    const avatar = process.env.FILE_UPLOAD_LOACTION + '/images/' + image.image
    if (fs.existsSync(avatar)) {
      fs.unlinkSync(avatar)
    }
    await image.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.images.imageRemoved'
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

// delete multiple images
exports.deleteImages = async (req, res) => {
  const images = req.body
  try {
    for (let a = 0; a < images.length; a++) {
      const preImage = await Image.findById(images[a])
      await Image.findByIdAndRemove(images[a], { useFindAndModify: false })
      const avatar = process.env.FILE_UPLOAD_LOACTION + '/images/' + preImage.image
      if (fs.existsSync(avatar)) {
        fs.unlinkSync(avatar)
      }
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.images.imagesRemoved'
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
