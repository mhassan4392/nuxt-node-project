const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchRoles, fetchRole, addRole, updateRole, deleteRole, deleteRoles } = require('../controllers/roles')

router.route('/')
  .get(fetchRoles)
  .post(isAuthenticated, addRole)

router.route('/delete')
  .post(isAuthenticated, deleteRoles)

router.route('/:id')
  .get(fetchRole)

router.route('/:id')
  .put(isAuthenticated, updateRole)
  .delete(isAuthenticated, deleteRole)

module.exports = router
