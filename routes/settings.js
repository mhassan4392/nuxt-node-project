const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchSettings, updateSingleSetting, addSetting, updateSetting, deleteSetting, deleteSettings } = require('../controllers/settings')

router.route('/')
  .get(fetchSettings)
  .post(isAuthenticated, addSetting)

router.route('/delete')
  .post(isAuthenticated, deleteSettings)

router.route('/single/:name')
  .put(updateSingleSetting)

router.route('/single/:name/:property')
  .put(updateSingleSetting)

router.route('/:id')
  .put(isAuthenticated, updateSetting)
  .delete(isAuthenticated, deleteSetting)

module.exports = router
