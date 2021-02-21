const express = require('express')
const router = express.Router()

const { getLangs, getTranslations, addLang, deleteLang, updateLang, getLang, addTranslation, deleteTranslation, updateTranslation } = require('../controllers/langs')

router.route('/')
  .get(getLangs)
  .post(addLang)

router.route('/translations')
  .get(getTranslations)
  .post(addTranslation)
  .delete(deleteTranslation)

router.route('/translations/:key')
  .delete(deleteTranslation)
  .put(updateTranslation)

router.route('/:locale')
  .delete(deleteLang)
  .put(updateLang)
  .get(getLang)

module.exports = router
