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
        message: 'errorMessages.somethingWentWrong',
        error: e
      })
  }
}

// fetch single tag
exports.fetchTag = async (req, res) => {
  const id = req.params.id
  try {
    const tag = await Tag.findById(id)
    return res
      .status(200)
      .json({
        success: true,
        tag
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
          message: 'errorMessages.tags.tagAlreadyExist'
        })
    }
    // create new tag
    await Tag.create({ title, slug })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.tags.tagCreated'
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
            message: 'successMessages.tags.tagUpdated'
          })
      } else {
        return res
          .status(400)
          .json({
            success: true,
            message: 'errorMessages.tags.tagAlreadyExist'
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
        message: 'successMessages.tags.tagUpdated'
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
          message: 'errorMessages.tags.tagNotFound'
        })
    }
    await tag.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.tags.tagRemoved'
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

// delete multiple tags
exports.deleteTags = async (req, res) => {
  const tags = req.body
  try {
    for (let a = 0; a < tags.length; a++) {
      await Tag.findByIdAndRemove(tags[a], { useFindAndModify: false })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.tags.tagsRemoved'
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
