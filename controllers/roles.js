// load role model
const Role = require('../models/Role')
// load slugify
const { default: slugify } = require('slugify')

// fetch multiple roles
exports.fetchRoles = async (req, res) => {
  try {
    const roles = await Role.find()
    return res
      .status(200)
      .json({
        success: true,
        roles
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

// fetch single role
exports.fetchRole = async (req, res) => {
  const id = req.params.id
  try {
    const role = await Role.findById(id)
    return res
      .status(200)
      .json({
        success: true,
        role
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

// add role
exports.addRole = async (req, res) => {
  const { title } = req.body
  // slugify the title
  req.body.slug = slugify(title)
  try {
    // check if role already exist with that slug
    const role = await Role.findOne({ slug: req.body.slug })
    if (role) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.roles.roleAlreadyExist'
        })
    }
    // create new role
    await Role.create(req.body)
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.roles.roleCreated'
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

// update role
exports.updateRole = async (req, res) => {
  const { id } = req.params
  const { title } = req.body
  req.body.slug = slugify(title)
  try {
    const role = await Role.findOne({ slug: req.body.slug })
    if (role) {
      if (String(role._id) === String(id)) {
        await Role.findByIdAndUpdate(id, req.body, {
          useFindAndModify: false
        })
        return res
          .status(200)
          .json({
            success: true,
            message: 'successMessages.roles.roleUpdated'
          })
      } else {
        return res
          .status(400)
          .json({
            success: true,
            message: 'errorMessages.roles.roleAlreadyExist'
          })
      }
    }
    await Role.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.roles.roleUpdated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: true,
        message: 'errorMessages.somethingWentWrong'
      })
  }
}

// delete role
exports.deleteRole = async (req, res) => {
  const { id } = req.params
  try {
    // check if role already exist with that slug
    const role = await Role.findById(id)
    if (!role) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.roles.roleNotFound'
        })
    }
    if (role.title === 'admin') {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.roles.roleCantNotDeleted'
        })
    }
    await role.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.roles.roleRemoved'
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

// delete multiple roles
exports.deleteRoles = async (req, res) => {
  const roles = req.body
  try {
    for (let a = 0; a < roles.length; a++) {
      await Role.findByIdAndRemove(roles[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.roles.rolesRemoved'
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
