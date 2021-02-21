// load notifcation model
const Notification = require('../models/Notification')

// fetch multiple notifications
exports.fetchNotifications = async (req, res) => {
  const user = req.params.user
  try {
    const notifications = await Notification.find({ user }).sort('-created')
    return res
      .status(200)
      .json({
        success: true,
        notifications
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error: e
      })
  }
}

// read notifications
exports.readNotifications = async (req, res) => {
  const user = req.params.user
  try {
    const notifications = await Notification.find({ user })
    if (notifications) {
      notifications.forEach(async (not) => {
        not.read = true
        await not.save()
      })
    }
    return res
      .status(200)
      .json({
        success: true,
        notifications
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error: e
      })
  }
}

// fetch single notification
exports.fetchNotification = (req, res) => {}

// add notification
exports.addNotification = async (req, res) => {
  try {
    await Notification.create(req.body)
    return res
      .status(200)
      .json({
        success: true,
        message: 'notification_created'
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error: e
      })
  }
}

// update notification
exports.updateNotification = async (req, res) => {
  const { id } = req.params
  try {
    const notification = await Notification.findById(id)
    if (notification) {
      await Notification.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
      })
      return res
        .status(200)
        .json({
          success: true,
          message: 'notification_updated'
        })
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: 'notification_not_found'
        })
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        success: true,
        message: 'something_went_wrong'
      })
  }
}

// delete notification
exports.deleteNotification = async (req, res) => {
  const { id } = req.params
  try {
    const notification = await Notification.findById(id)
    if (!notification) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'notification_not_found'
        })
    }
    await notification.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'notification_removed'
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error: e
      })
  }
}

// delete multiple notifications
exports.deleteNotifications = async (req, res) => {
  const notifications = req.body
  try {
    for (let a = 0; a < notifications.length; a++) {
      await Notification.findByIdAndRemove(notifications[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'notificationsDeletedSuccessfully'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error: error
      })
  }
}
