// load newsletter model
const Newsletter = require('../models/Newsletter')
const User = require('../models/User')
const Notification = require('../models/Notification')
const Role = require('../models/Role')

// fetch multiple subscribers
exports.fetchSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
    const count = await Newsletter.countDocuments()
    return res
      .status(200)
      .json({
        success: true,
        subscribers,
        count
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

// fetch single subscriber
exports.fetchSubscriber = (req, res) => {}

// add subscriber
exports.addSubscriber = async (req, res) => {
  const { email } = req.body
  try {
    // check if subscriber already exist with that email
    const subscriber = await Newsletter.findOne({ email })
    if (subscriber) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.subscribers.subscriberAlreadyExist'
        })
    }
    // create new subscriber
    const data = await Newsletter.create({ email })
    const role = await Role.findOne({ title: 'admin' })
    const users = await User.find({ role: role._id })
    users.forEach(async (user) => {
      await Notification.create({
        user: user._id,
        message: 'A new email subscribed',
        type: 'newsletter',
        data
      })
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.subscribers.subscribeSuccessfull'
      })
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.subscribers.subscribeFailed',
        error: error
      })
  }
}

// update subscriber
exports.updateSubscriber = async (req, res) => {
  const { id } = req.params
  try {
    const subscriber = await Newsletter.findById(id)
    if (subscriber) {
      await subscriber.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
      })
      return res
        .status(200)
        .json({
          success: true,
          message: 'successMessages.subscribers.subscriberUpdated'
        })
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: 'successMessages.subscribers.subscriberNotFound'
        })
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        success: true,
        message: 'errorMessages.somethingWentWrong'
      })
  }
}

// delete subscriber
exports.deleteSubscriber = async (req, res) => {
  const { id } = req.params
  try {
    // check if subscriber already exist with that slug
    const subscriber = await Newsletter.findById(id)
    if (!subscriber) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.subscribers.subscriberNotFound'
        })
    }
    await subscriber.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.subscribers.subscriberRemoved'
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

// delete multiple subscribers
exports.deleteSubscribers = async (req, res) => {
  const subscribers = req.body
  try {
    for (let a = 0; a < subscribers.length; a++) {
      await Newsletter.findByIdAndRemove(subscribers[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.subscribers.subscribersRemoved'
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
