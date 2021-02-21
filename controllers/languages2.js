const Lang = require('../models/Lang')
const defaultTranslations = require('../localization/locales/en.json')

// required deepMerge
const deepmerge = require('../utils/deepMerge')

// get all languagess
exports.getLanguages = async (req, res, next) => {
  try {
    let languages = await Lang.find()
    if (languages.length === 0) {
      const lang = { name: 'English', locale: 'en', translations: defaultTranslations }
      await Lang.create(lang)
      languages = await Lang.find()
    }
    const langs = languages.map(lang => {
      const la = { _id: lang._id, name: lang.name, locale: lang.locale }
      return la
    })
    return res
      .status(200)
      .json({
        success: true,
        count: languages.length,
        languages: langs
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}

// get language
exports.getLanguage = async (req, res, next) => {

}

// add a new language
exports.addLanguage = async (req, res, next) => {
  const { locale, name } = req.body
  try {
    const langLocale = await Lang.findOne({ locale })
    if (langLocale) {
      return res
        .status(400)
        .json({
          success: true,
          message: 'language_already_exist_with_locale'
        })
    }
    const langName = await Lang.findOne({ name })
    if (langName) {
      return res
        .status(400)
        .json({
          success: true,
          message: 'language_already_exist_with_name'
        })
    }
    const enLanguage = await Lang.findOne({ locale: 'en' })
    const language = {
      name,
      locale,
      translations: enLanguage.translations
    }
    await Lang.create(language)
    return res
      .status(200)
      .json({
        success: true,
        message: 'language_add'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}

// update language
exports.updateLanguage = async (req, res) => {
  const { id } = req.params
  try {
    if (req.body.locale === 'en') {
      return res
        .status(400)
        .json({
          success: false,
          message: 'language_can_not_update'
        })
    }

    await Lang.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'language_update'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}

// delete language
exports.deleteLanguage = async (req, res, next) => {
  const { id } = req.params
  try {
    const language = await Lang.findById(id)
    if (language.locale === 'en') {
      return res
        .status(400)
        .json({
          success: false,
          message: 'language_can_not_delete'
        })
    }
    await language.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'language_removed'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}

// delete language
exports.deleteLanguages = async (req, res) => {
  const languages = req.body
  console.log(languages)
  try {
    languages.forEach(async (lang) => {
      const language = await Lang.findById(lang)
      if (language.locale !== 'en') {
        console.log(language.locale)
        await Lang.findByIdAndRemove(lang, {
          useFindAndModify: false
        })
      }
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'errorMessages.languagesRemoved'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}

exports.getTranslations = async (req, res) => {
  try {
    const languages = await Lang.find()
    const translations = {}
    languages.map(lang => {
      translations[lang.locale] = lang.translations
    })
    return res
      .status(200)
      .json({
        success: true,
        translations
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong'
      })
  }
}

// get single translation
exports.getTranslation = async (req, res) => {
  try {
    const language = await Lang.findOne({ locale: req.params.locale })
    const trs = {}
    trs[language.locale] = language.translations
    return res
      .status(200)
      .json({
        success: true,
        translation: trs
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong'
      })
  }
}

// get crud translations
exports.getCrudTranslations = async (req, res) => {
  try {
    const language = await Lang.findOne({ locale: req.params.locale })
    const translations = []
    for (const [key, value] of Object.entries(language.translations)) {
      if (typeof value === 'object') {
        for (const [k, v] of Object.entries(value)) {
          if (typeof v === 'object') {
            for (const [a, b] of Object.entries(v)) {
              if (typeof b === 'object') {
                for (const [c, d] of Object.entries(b)) {
                  if (typeof d === 'object') {
                    for (const [e, f] of Object.entries(d)) {
                      translations.push({
                        key: key + '.' + k + '.' + a + '.' + c + '.' + e,
                        value: f
                      })
                    }
                  } else {
                    translations.push({
                      key: key + '.' + k + '.' + a + '.' + c,
                      value: d
                    })
                  }
                }
              } else {
                translations.push({
                  key: key + '.' + k + '.' + a,
                  value: b
                })
              }
            }
          } else {
            translations.push({
              key: key + '.' + k,
              value: v
            })
          }
        }
      } else {
        translations.push({
          key,
          value
        })
      }
    }

    return res
      .status(200)
      .json({
        success: true,
        translations
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: error
      })
  }
}

// add new translation
exports.addTranslation = async (req, res) => {
  try {
    const languages = await Lang.find()

    if (req.body) {
      languages.forEach(async (l) => {
        // eslint-disable-next-line
        const trs = l.translations
        const keys = req.body.key.split('.')
        let value = 'trs'
        keys.forEach(async (key) => {
          // eslint-disable-next-line
          const v = eval(value + '.' + key)
          if (v) {
            console.log(v)
            value = value + '.' + key
          } else {
            console.log('not exist')
          }
        })
      })

      return res.status(200).json({
        success: true
      })
    }

    languages.forEach(async (l) => {
      let trs = l.translations
      if (req.body.key.includes('.')) {
        const arr = req.body.key.split('.', 5)
        const k1 = arr[0]
        const k2 = arr[1]
        const k3 = arr[2]
        const k4 = arr[3]
        const k5 = arr[4]

        const obj = {}
        if (k5) {
          if (typeof trs[k4] === 'string' || typeof trs[k3] === 'string' || typeof trs[k2] === 'string' || typeof trs[k1] === 'string') {
            return res
              .status(400)
              .json({
                success: false,
                message: 'already assign string value'
              })
          }
          if (trs[k1] && trs[k1][k2] && trs[k1][k2][k3] && trs[k1][k2][k3][k4] && trs[k1][k2][k3][k4][k5]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'key 5 exist'
              })
          } else {
            obj[k1] = {}
            obj[k1][k2] = {}
            obj[k1][k2][k3] = {}
            obj[k1][k2][k3][k4] = {}
            obj[k1][k2][k3][k4][k5] = req.body.value
          }
        } else if (k4) {
          if (typeof trs[k3] === 'string' || typeof trs[k2] === 'string' || typeof trs[k1] === 'string') {
            return res
              .status(400)
              .json({
                success: false,
                message: 'already assign string value'
              })
          }
          if (trs[k1] && trs[k1][k2] && trs[k1][k2][k3] && trs[k1][k2][k3][k4]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'key 4 exist'
              })
          } else {
            obj[k1] = {}
            obj[k1][k2] = {}
            obj[k1][k2][k3] = {}
            obj[k1][k2][k3][k4] = req.body.value
          }
        } else if (k3) {
          if (typeof trs[k2] === 'string' || typeof trs[k1] === 'string') {
            return res
              .status(400)
              .json({
                success: false,
                message: 'already assign string value'
              })
          }
          if (trs[k1] && trs[k1][k2] && trs[k1][k2][k3]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'key 3 exist'
              })
          } else {
            obj[k1] = {}
            obj[k1][k2] = {}
            obj[k1][k2][k3] = req.body.value
          }
        } else {
          if (typeof trs[k1] === 'string') {
            return res
              .status(400)
              .json({
                success: false,
                message: 'already assign string value'
              })
          }
          if (trs[k1] && trs[k1][k2]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'key 2 exist'
              })
          } else {
            obj[k1] = {}
            obj[k1][k2] = req.body.value
          }
        }

        trs = deepmerge(l.translations, obj)
      } else {
        if (l.translations[req.body.key]) {
          return res
            .status(400)
            .json({
              success: false,
              message: 'key 1 exist'
            })
        }
        trs[req.body.key] = req.body.value
      }
      l.translations = trs
      await Lang.findByIdAndUpdate(l._id, l, {
        useFindAndModify: false
      })
    })

    return res
      .status(200)
      .json({
        success: true,
        message: 'translation_created'
      })
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}

// update translation
exports.updateTranslation = async (req, res, next) => {
  const { locale } = req.params
  try {
    const language = await Lang.findOne({ locale })
    const translation = language.translations

    if (req.body.key.includes('.')) {
      const arr = req.body.key.split('.', 5)
      const k1 = arr[0]
      const k2 = arr[1]
      const k3 = arr[2]
      const k4 = arr[3]
      const k5 = arr[4]
      if (k5) {
        translation[k1][k2][k3][k4][k5] = req.body.value
      } else if (k4) {
        translation[k1][k2][k3][k4] = req.body.value
      } else if (k3) {
        translation[k1][k2][k3] = req.body.value
      } else {
        translation[k1][k2] = req.body.value
      }
    } else {
      if (!translation[req.body.key]) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'key 1 exist'
          })
      }
      translation[req.body.key] = req.body.value
    }
    // }
    language.translations = translation

    await Lang.findByIdAndUpdate(language._id, language, {
      useFindAndModify: false
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'translation_updated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}

// delete translation
exports.deleteTranslation = async (req, res) => {
  try {
    const languages = await Lang.find()
    languages.forEach(async (l) => {
      const trs = l.translations
      if (req.params.key.includes('.')) {
        const arr = req.params.key.split('.', 5)
        const k1 = arr[0]
        const k2 = arr[1]
        const k3 = arr[2]
        const k4 = arr[3]
        const k5 = arr[4]

        if (k5) {
          delete trs[k1][k2][k3][k4][k5]
          if (Object.keys(trs[k1][k2][k3][k4]).length === 0) {
            delete trs[k1][k2][k3][k4]
          }
          if (Object.keys(trs[k1][k2][k3]).length === 0) {
            delete trs[k1][k2][k3]
          }
          if (Object.keys(trs[k1][k2]).length === 0) {
            delete trs[k1][k2]
          }
          if (Object.keys(trs[k1]).length === 0) {
            delete trs[k1]
          }
        } else if (k4) {
          delete trs[k1][k2][k3][k4]
          if (Object.keys(trs[k1][k2][k3]).length === 0) {
            delete trs[k1][k2][k3]
          }
          if (Object.keys(trs[k1][k2]).length === 0) {
            delete trs[k1][k2]
          }
          if (Object.keys(trs[k1]).length === 0) {
            delete trs[k1]
          }
        } else if (k3) {
          delete trs[k1][k2][k3]
          if (Object.keys(trs[k1][k2]).length === 0) {
            delete trs[k1][k2]
          }
          if (Object.keys(trs[k1]).length === 0) {
            delete trs[k1]
          }
        } else {
          if (Object.keys(trs[k1]).length === 0) {
            delete trs[k1]
          }
          delete trs[k1][k2]
        }
      } else {
        delete trs[req.params.key]
      }
      l.translations = trs
      await Lang.findByIdAndUpdate(l._id, l, {
        useFindAndModify: false
      })
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'translation_removed'
      })
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}

// delete translations
exports.deleteTranslations = async (req, res) => {
  const translations = req.body
  try {
    const languages = await Lang.find()
    languages.forEach(async (l) => {
      const trs = l.translations
      translations.forEach(async (tr) => {
        if (tr.includes('.')) {
          const arr = tr.split('.', 5)
          const k1 = arr[0]
          const k2 = arr[1]
          const k3 = arr[2]
          const k4 = arr[3]
          const k5 = arr[4]

          if (k5) {
            delete trs[k1][k2][k3][k4][k5]
            if (Object.keys(trs[k1][k2][k3][k4]).length === 0) {
              delete trs[k1][k2][k3][k4]
            }
            if (Object.keys(trs[k1][k2][k3]).length === 0) {
              delete trs[k1][k2][k3]
            }
            if (Object.keys(trs[k1][k2]).length === 0) {
              delete trs[k1][k2]
            }
            if (Object.keys(trs[k1]).length === 0) {
              delete trs[k1]
            }
          } else if (k4) {
            delete trs[k1][k2][k3][k4]
            if (Object.keys(trs[k1][k2][k3]).length === 0) {
              delete trs[k1][k2][k3]
            }
            if (Object.keys(trs[k1][k2]).length === 0) {
              delete trs[k1][k2]
            }
            if (Object.keys(trs[k1]).length === 0) {
              delete trs[k1]
            }
          } else if (k3) {
            delete trs[k1][k2][k3]
            if (Object.keys(trs[k1][k2]).length === 0) {
              delete trs[k1][k2]
            }
            if (Object.keys(trs[k1]).length === 0) {
              delete trs[k1]
            }
          } else {
            if (Object.keys(trs[k1]).length === 0) {
              delete trs[k1]
            }
            delete trs[k1][k2]
          }
        } else {
          delete trs[tr]
        }
      })
      l.translations = trs
      await Lang.findByIdAndUpdate(l._id, l, {
        useFindAndModify: false
      })
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'translation_removed'
      })
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({
        success: false,
        message: 'something_went_wrong',
        error
      })
  }
}
