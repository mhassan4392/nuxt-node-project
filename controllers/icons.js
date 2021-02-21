const Icon = require('../models/Icon')
// load slugify
const { default: slugify } = require('slugify')
// get all icons
exports.fetchIcons = async (req, res, next) => {
  try {
    const icons = await Icon.find().sort('order')
    return res.status(200).json({
      success: true,
      icons
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}
exports.fetchIcon = async (req, res, next) => {}

// add new Icon
exports.addIcon = async (req, res, next) => {
  const newIcon = req.body
  newIcon.slug = slugify(req.body.title)
  try {
    await Icon.create(newIcon)
    return res.status(200).json({
      success: true,
      message: 'errorMessages.icons.iconCreated'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}

// update icon
exports.updateIcon = async (req, res, next) => {
  const { id } = req.params
  const updateIcon = req.body
  updateIcon.slug = slugify(req.body.title)
  try {
    await Icon.findByIdAndUpdate(id, updateIcon)
    return res.status(200).json({
      success: true,
      message: 'successMessages.icons.iconUpdated'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}

// delete icon
exports.deleteIcon = async (req, res, next) => {
  const { id } = req.params
  try {
    const icon = await Icon.findById(id)
    await icon.remove()
    return res.status(200).json({
      success: true,
      message: 'successMessages.icons.iconRemoved'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong'
    })
  }
}

// delete multiple icons
exports.deleteIcons = async (req, res) => {
  const icons = req.body
  try {
    for (let a = 0; a < icons.length; a++) {
      await Icon.findByIdAndRemove(icons[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.icons.iconsRemoved'
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
