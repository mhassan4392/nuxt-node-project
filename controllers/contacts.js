const Contact = require('../models/Contact')
// load slugify
const { default: slugify } = require('slugify')
// get all contacts
exports.fetchContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort('order')
    return res.status(200).json({
      success: true,
      contacts
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}
exports.fetchContact = async (req, res, next) => {}

// add new contact
exports.addContact = async (req, res, next) => {
  const newContact = req.body
  newContact.slug = slugify(req.body.title)
  try {
    await Contact.create(newContact)
    return res.status(200).json({
      success: true,
      message: 'successMessages.contacts.contactCreated'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}

// update contact
exports.updateContact = async (req, res, next) => {
  const { id } = req.params
  const updateContact = req.body
  updateContact.slug = slugify(req.body.title)
  try {
    await Contact.findByIdAndUpdate(id, updateContact)
    return res.status(200).json({
      success: true,
      message: 'successMessages.contacts.contactUpdate'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}

// delete contact
exports.deleteContact = async (req, res, next) => {
  const { id } = req.params
  try {
    const contact = await Contact.findById(id)
    await contact.remove()
    return res.status(200).json({
      success: true,
      message: 'successMessages.contacts.contactRemove'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong'
    })
  }
}

// delete multiple contacts
exports.deleteContacts = async (req, res) => {
  const contacts = req.body
  try {
    for (let a = 0; a < contacts.length; a++) {
      await Contact.findByIdAndRemove(contacts[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.contacts.contactsRemoved'
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
