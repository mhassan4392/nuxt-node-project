// load tag model
const Tag = require('../models/Tag')
// load slugify
const { default: slugify } = require('slugify')

// fetch multiple tags
exports.fetchTags = async (req, res) => {
  try {
    const tags = await Tag.find()
    const count = await Tag.countDocuments()
    return res
      .status(200)
      .json({
        success: true,
        tags,
        count
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error: e
      })
  }
}

// fetch single tag
exports.fetchTag = (req, res) => {}

// add tag
exports.addTag = async (req, res) => {
  const { title } = req.body
  // slugify the title
  const slug = slugify(title)
  try {
    // check if tag already exist with that slug
    const tag = await Tag.findOne({ slug })
    if (tag) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'tag_already_exist'
        })
    }
    // create new tag
    await Tag.create({ title, slug })
    return res
      .status(200)
      .json({
        success: true,
        message: 'tag_created'
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error: e
      })
  }
}

// update tag
exports.updateTag = async (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const slug = slugify(title)
  try {
    let tag = await Tag.findOne({ slug })
    if (tag) {
      if (String(tag._id) === String(id)) {
        tag.title = title
        tag.slug = slug
        await tag.save()
        return res
          .status(200)
          .json({
            success: true,
            message: 'tag_updated'
          })
      } else {
        return res
          .status(400)
          .json({
            success: true,
            message: 'tag_already_exist'
          })
      }
    }
    tag = await Tag.findById(id)
    tag.title = title
    tag.slug = slug
    await tag.save()
    return res
      .status(200)
      .json({
        success: true,
        message: 'tag_updated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: true,
        message: 'something_went_wrong'
      })
  }
}

// delete tag
exports.deleteTag = async (req, res) => {
  const { id } = req.params
  try {
    // check if tag already exist with that slug
    const tag = await Tag.findById(id)
    if (!tag) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'tag_not_found'
        })
    }
    await tag.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'tag_removed'
      })
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error: e
      })
  }
}

// delete multiple tags
exports.deleteTags = (req, res) => {}
