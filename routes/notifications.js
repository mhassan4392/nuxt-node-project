const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchNotifications, readNotifications, fetchNotification, addNotification, updateNotification, deleteNotification, deleteNotifications } = require('../controllers/notifications')

router.route('/:user')
  .get(fetchNotifications)
  .put(readNotifications)
  .post(addNotification)

router.route('/delete')
  .post(isAuthenticated, deleteNotifications)

router.route('/:id')
  .get(fetchNotification)
  .put(isAuthenticated, updateNotification)
  .delete(isAuthenticated, deleteNotification)

module.exports = router
