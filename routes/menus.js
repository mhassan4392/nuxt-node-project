const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchMenus, fetchMenu, addMenu, updateMenu, deleteMenu, deleteMenus } = require('../controllers/menus')

router.route('/')
  .get(fetchMenus)
  .post(isAuthenticated, addMenu)

router.route('/delete')
  .post(isAuthenticated, deleteMenus)

router.route('/:slug')
  .get(fetchMenu)

router.route('/:id')
  .put(isAuthenticated, updateMenu)
  .delete(isAuthenticated, deleteMenu)

module.exports = router
