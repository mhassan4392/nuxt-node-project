const express = require('express')
const router = express.Router()

// const { isAuthenticated } = require('../middlewares/auth')

const { fetchTags, fetchTag, addTag, updateTag, deleteTag, deleteTags } = require('../controllers/tags')

router.route('/')
  .get(fetchTags)
  .post(addTag)
  .delete(deleteTags)
// router.route('/delete')
//   .post(deleteTags)
router.route('/:id')
  .get(fetchTag)

router.route('/:id')
  .put(updateTag)
  .delete(deleteTag)

module.exports = router
