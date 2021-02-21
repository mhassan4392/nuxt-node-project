// load page model
const Page = require('../models/Page')
// load slugify
const { default: slugify } = require('slugify')

// fetch multiple pages
exports.fetchPages = async (req, res) => {
  try {
    const pages = await Page.find()
    const count = await Page.countDocuments()
    return res
      .status(200)
      .json({
        success: true,
        pages,
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

// fetch single page
exports.fetchPage = async (req, res) => {
  const slug = req.params.slug
  try {
    const page = await Page.findOne({ slug })
    return res
      .status(200)
      .json({
        success: true,
        page
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

// add page
exports.addPage = async (req, res) => {
  const { title } = req.body
  // slugify the title
  req.body.slug = slugify(title)
  try {
    // check if page already exist with that slug
    const page = await Page.findOne({ slug: req.body.slug })
    if (page) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.pages.pageAlreadyExist'
        })
    }
    // create new page
    await Page.create(req.body)
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.pages.pageCreated'
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

// update page
exports.updatePage = async (req, res) => {
  const { id } = req.params
  const { title } = req.body
  req.body.slug = slugify(title)
  try {
    const page = await Page.findOne({ slug: req.body.slug })
    if (page) {
      if (String(page._id) === String(id)) {
        await Page.findByIdAndUpdate(id, req.body, {
          useFindAndModify: false
        })
        return res
          .status(200)
          .json({
            success: true,
            message: 'successMessages.pages.pageUpdated'
          })
      } else {
        return res
          .status(400)
          .json({
            success: true,
            message: 'errorMessages.pages.pageAlreadyExist'
          })
      }
    }
    await Page.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.pages.pageUpdated'
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

// delete page
exports.deletePage = async (req, res) => {
  const { id } = req.params
  try {
    // check if page already exist with that slug
    const page = await Page.findById(id)
    if (!page) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'errorMessages.pages.pageNotFound'
        })
    }
    await page.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.pages.pageRemoved'
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

// delete multiple pages
exports.deletePages = async (req, res) => {
  const pages = req.body
  try {
    for (let a = 0; a < pages.length; a++) {
      await Page.findByIdAndRemove(pages[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.pages.pagesRemoved'
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
