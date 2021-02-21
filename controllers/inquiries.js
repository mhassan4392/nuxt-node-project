// load inquiry model
const Inquiry = require('../models/Inquiry')
const User = require('../models/User')
const Notification = require('../models/Notification')
const Role = require('../models/Role')

// fetch multiple inquiries
exports.fetchInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
    return res
      .status(200)
      .json({
        success: true,
        inquiries
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

// fetch single inquiry
exports.fetchInquiry = (req, res) => {}

// add inquiry
exports.addInquiry = async (req, res) => {
  try {
    // create new inquiry
    const data = await Inquiry.create(req.body)
    const role = await Role.findOne({ title: 'admin' })
    const users = await User.find({ role: role._id })
    users.forEach(async (user) => {
      await Notification.create({
        user: user._id,
        message: 'A New Inquiry Recieved',
        type: 'inquiry',
        data
      })
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.inquiries.inquirySuccessfull'
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.inquiries.inquiryFailed',
        error: e
      })
  }
}

// update inquiry
exports.updateInquiry = async (req, res) => {
  const { id } = req.params
  try {
    const inquiry = await Inquiry.findById(id)
    if (inquiry) {
      await Inquiry.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
      })
      return res
        .status(200)
        .json({
          success: true,
          message: 'successMessages.inquiries.inquiryUpdated'
        })
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.inquiries.inquiryNotFound'
        })
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong'
      })
  }
}

// delete inquiry
exports.deleteInquiry = async (req, res) => {
  const { id } = req.params
  try {
    const inquiry = await Inquiry.findById(id)
    if (!inquiry) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.inquiries.inquiryNotFound'
        })
    }
    await inquiry.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.inquiries.inquiryRemoved'
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

// delete multiple inquiries
exports.deleteInquiries = async (req, res) => {
  const inquiries = req.body
  try {
    for (let a = 0; a < inquiries.length; a++) {
      await Inquiry.findByIdAndRemove(inquiries[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.inquiries.inquiriesRemoved'
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
