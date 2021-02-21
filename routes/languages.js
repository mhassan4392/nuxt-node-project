const express = require('express')
const router = express.Router()

const { getLanguages, getTranslations, getTranslation, getCrudTranslations, addLanguage, deleteLanguage, updateLanguage, getLanguage, addTranslation, deleteTranslation, updateTranslation, deleteLanguages, deleteTranslations } = require('../controllers/languages')

router.route('/')
  .get(getLanguages)
  .post(addLanguage)

router.route('/delete')
  .post(deleteLanguages)

router.route('/translations/delete')
  .post(deleteTranslations)

router.route('/translations')
  .post(addTranslation)
  .delete(deleteTranslation)

router.route('/translations/:locale')
  .get(getTranslations)
  .put(updateTranslation)

router.route('/translation/:locale')
  .get(getTranslation)

router.route('/translations/:key')
  .delete(deleteTranslation)

router.route('/translations/crud/:locale')
  .get(getCrudTranslations)

router.route('/:id')
  .delete(deleteLanguage)
  .put(updateLanguage)
  .get(getLanguage)

module.exports = router
