const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchSubscribers, fetchSubscriber, addSubscriber, updateSubscriber, deleteSubscriber, deleteSubscribers } = require('../controllers/newsletter')

router.route('/')
  .get(fetchSubscribers)
  .post(addSubscriber)

router.route('/delete')
  .post(isAuthenticated, deleteSubscribers)

router.route('/:id')
  .get(fetchSubscriber)
  .put(isAuthenticated, updateSubscriber)
  .delete(isAuthenticated, deleteSubscriber)

module.exports = router
