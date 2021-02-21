const Menu = require('../models/Menu')
// load slugify
const { default: slugify } = require('slugify')
// get all menus
exports.fetchMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find()
    return res.status(200).json({
      success: true,
      menus
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}

// fetch single menu
exports.fetchMenu = async (req, res, next) => {
  const { slug } = req.params
  try {
    const menu = await Menu.findOne({ slug })
    if (!menu) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.menus.menuNotFound'
        })
    }

    menu.items.forEach(element => {
      if (!element.children) {
        element.children = []
      } else {
        element.children.forEach(el => {
          if (!el.children) {
          }
        })
      }
    })
    return res
      .status(200)
      .json({
        success: true,
        menu
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

// add new menu
exports.addMenu = async (req, res, next) => {
  const newMenu = req.body
  newMenu.slug = slugify(req.body.title)
  try {
    await Menu.create(newMenu)
    return res.status(200).json({
      success: true,
      message: 'successMessages.menus.menuCreated'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}

// update Menu
exports.updateMenu = async (req, res, next) => {
  const { id } = req.params
  const updateMenu = req.body
  updateMenu.slug = slugify(req.body.title)
  try {
    await Menu.findByIdAndUpdate(id, updateMenu, { useFindAndModify: false })
    return res.status(200).json({
      success: true,
      message: 'successMessages.menus.menuUpdated'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong',
      error
    })
  }
}

// delete Menu
exports.deleteMenu = async (req, res, next) => {
  const { id } = req.params
  try {
    const menu = await Menu.findById(id)
    await menu.remove()
    return res.status(200).json({
      success: true,
      message: 'successMessages.menus.menuRemoved'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'errorMessages.somethingWentWrong'
    })
  }
}

// delete multiple menus
exports.deleteMenus = async (req, res) => {
  const menus = req.body
  try {
    for (let a = 0; a < menus.length; a++) {
      await Menu.findByIdAndRemove(menus[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.menus.menusRemoved'
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
