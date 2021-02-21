// load tag model
const Setting = require('../models/Setting')

const path = require('path')
const fs = require('fs')

// multiple settings
exports.fetchSettings = async (req, res) => {
  try {
    const allSettings = await Setting.find()

    const settings = {}
    allSettings.forEach(s => {
      settings[s.name] = s.settings
      s.settings = JSON.stringify(s.settings, undefined, 2)
    })

    return res
      .status(200)
      .json({
        success: true,
        settings,
        allSettings
      })
  } catch (e) {
    console.log(e)
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error: e
      })
  }
}

// fetch single setting
exports.fetchSetting = (req, res) => {}

// add setting
exports.addSetting = async (req, res) => {
  const { name } = req.body
  try {
    // check if tag already exist with that slug
    const setting = await Setting.findOne({ name })
    if (setting) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'successMessages.settings.settingAlreadyExist'
        })
    }
    // create new tag
    await Setting.create({ name, settings: JSON.parse(req.body.settings) })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.settings.settingCreated'
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error: e
      })
  }
}

// update setting
exports.updateSetting = async (req, res) => {
  const { id } = req.params
  const { name, settings } = req.body
  try {
    let setting = await Setting.findOne({ name })
    if (setting) {
      if (String(setting._id) === String(id)) {
        setting.name = name
        setting.settings = JSON.parse(settings)
        await setting.save()
        return res
          .status(200)
          .json({
            success: true,
            message: 'successMessages.settings.settingUpdated'
          })
      } else {
        return res
          .status(400)
          .json({
            success: true,
            message: 'errorMessages.settings.settingAlreadyExist'
          })
      }
    }
    setting = await Setting.findById(id)
    setting.name = name
    setting.settings = JSON.parse(settings)
    await setting.save()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.settings.settingUpdated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong'
      })
  }
}

// update single setting
exports.updateSingleSetting = async (req, res) => {
  const { name } = req.params
  const { property } = req.params
  const settings = req.body
  try {
    const setting = await Setting.findOne({ name })

    const logo = req.files ? req.files.logo : null
    if (logo) {
      if (!logo.mimetype.startsWith('image')) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.plzUploadImage'
          })
      }
      if (logo.size > 2048000) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.imageSize'
          })
      }
      if (!fs.existsSync(process.env.FILE_UPLOAD_LOACTION + '/app')) {
        fs.mkdirSync(process.env.FILE_UPLOAD_LOACTION + '/app')
      }
      logo.name = `logo${path.parse(logo.name).ext}`
      logo.mv(`${process.env.FILE_UPLOAD_LOACTION}/app/${logo.name}`, err => {
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
      settings.logo = logo.name
    }

    const favicon = req.files ? req.files.favicon : null
    if (favicon) {
      if (!favicon.mimetype.startsWith('image')) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.plzUploadImage'
          })
      }
      if (favicon.size > 2048000) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'errorMessages.image.imageSize'
          })
      }
      if (!fs.existsSync(process.env.FILE_UPLOAD_LOACTION + '/app')) {
        fs.mkdirSync(process.env.FILE_UPLOAD_LOACTION + '/app')
      }
      favicon.name = `favicon${path.parse(favicon.name).ext}`
      favicon.mv(`${process.env.FILE_UPLOAD_LOACTION}/app/${favicon.name}`, err => {
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
      settings.favicon = favicon.name
    }

    if (setting) {
      if (property) {
        if (setting.settings[property]) {
          const settingProperty = setting.settings
          settingProperty[property] = settings
          setting.settings = settingProperty
        }
      } else {
        setting.settings = settings
      }
      await Setting.findOneAndUpdate({ name }, setting, {
        useFindAndModify: false
      })
      return res
        .status(200)
        .json({
          success: true,
          message: 'successMessages.settings.settingUpdated'
        })
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.settings.settingNotFound'
        })
    }
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
// delete setting
exports.deleteSetting = async (req, res) => {
  const { id } = req.params
  try {
    // check if setting already exist with that id
    const setting = await Setting.findById(id)
    if (!setting) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.settings.settingNotFound'
        })
    }
    await setting.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.settings.settingRemoved'
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error: e
      })
  }
}

// delete multiple settings
exports.deleteSettings = async (req, res) => {
  const settings = req.body
  try {
    for (let a = 0; a < settings.length; a++) {
      await Setting.findByIdAndRemove(settings[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'errorMessages.settings.settingsRemoved'
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
