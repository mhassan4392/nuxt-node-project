const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchContacts, fetchContact, addContact, updateContact, deleteContact, deleteContacts } = require('../controllers/contacts')

router.route('/')
  .get(fetchContacts)
  .post(isAuthenticated, addContact)

router.route('/delete')
  .post(isAuthenticated, deleteContacts)

router.route('/:id')
  .get(fetchContact)

router.route('/:id')
  .put(isAuthenticated, updateContact)
  .delete(isAuthenticated, deleteContact)

module.exports = router
