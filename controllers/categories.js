// load category model
const Category = require('../models/Category')
// load slugify
const { default: slugify } = require('slugify')

// fetch multiple categories
exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    const count = await Category.countDocuments()
    return res
      .status(200)
      .json({
        success: true,
        categories,
        count
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

// fetch single category
exports.fetchCategory = (req, res) => {}

// add category
exports.addCategory = async (req, res) => {
  const { title } = req.body
  // slugify the title
  const slug = slugify(title)
  try {
    // check if category already exist with that slug
    const category = await Category.findOne({ slug })
    if (category) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.categories.categoryAlreadyExist'
        })
    }
    // create new category
    await Category.create({ title, slug })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.categories.categoryCreated'
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

// update category
exports.updateCategory = async (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const slug = slugify(title)
  try {
    let category = await Category.findOne({ slug })
    if (category) {
      if (String(category._id) === String(id)) {
        category.title = title
        category.slug = slug
        await category.save()
        return res
          .status(200)
          .json({
            success: true,
            message: 'successMessages.categories.categoryUpdated'
          })
      } else {
        return res
          .status(400)
          .json({
            success: true,
            message: 'errorMessages.categories.categoryAlreadyExist'
          })
      }
    }
    category = await Category.findById(id)
    category.title = title
    category.slug = slug
    await category.save()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.categories.categoryUpdated'
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

// delete category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params
  try {
    // check if category already exist with that slug
    const category = await Category.findById(id)
    if (!category) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.categories.categoryNotFound'
        })
    }
    await category.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.categories.categoryRemoved'
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

// delete multiple categories
exports.deleteCategories = async (req, res) => {
  const cats = req.body
  try {
    for (let a = 0; a < cats.length; a++) {
      await Category.findByIdAndRemove(cats[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.categories.categoriesRemoved'
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
