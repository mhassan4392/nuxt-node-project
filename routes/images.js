const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const { fetchImages, fetchImage, addImage, updateImage, deleteImage, deleteImages } = require('../controllers/images')

router.route('/')
  .get(fetchImages)
  .post(addImage)

router.route('/delete')
  .post(isAuthenticated, deleteImages)

router.route('/:id')
  .get(fetchImage)

router.route('/:id')
  .put(isAuthenticated, updateImage)
  .delete(isAuthenticated, deleteImage)

module.exports = router
