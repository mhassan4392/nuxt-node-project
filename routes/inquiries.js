const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchInquiries, fetchInquiry, addInquiry, updateInquiry, deleteInquiry, deleteInquiries } = require('../controllers/inquiries')

router.route('/')
  .get(fetchInquiries)
  .post(addInquiry)

router.route('/delete')
  .post(isAuthenticated, deleteInquiries)

router.route('/:id')
  .get(fetchInquiry)
  .put(isAuthenticated, updateInquiry)
  .delete(isAuthenticated, deleteInquiry)

module.exports = router
