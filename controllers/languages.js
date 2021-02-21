const Lang = require('../models/Lang')

// required deepMerge
const deepmerge = require('../utils/deepMerge')

// get all languagess
exports.getLanguages = async (req, res, next) => {
  try {
    const languages = await Lang.find()
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
        message: 'errorMessages.somethingWentWrong',
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
          message: 'errorMessages.languages.languageAlreadyExistWithLocale'
        })
    }
    const langName = await Lang.findOne({ name })
    if (langName) {
      return res
        .status(400)
        .json({
          success: true,
          message: 'errorMessages.languages.languageAlreadyExistWithName'
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
        message: 'successMessages.languages.languageCreated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
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
          message: 'errorMessages.languages.languageCanNotUpdated'
        })
    }

    await Lang.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.languages.languageUpdated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
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
          message: 'errorMessages.languages.languageCanNotDeleted'
        })
    }
    await language.remove()
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.languages.languageRemoved'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}

// delete language
exports.deleteLanguages = async (req, res) => {
  const languages = req.body
  try {
    for (let a = 0; a < languages.length; a++) {
      const language = await Lang.findById(languages[a])
      if (language.locale !== 'en') {
        await Lang.findByIdAndRemove(languages[a], {
          useFindAndModify: false
        })
      }
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'successMessages.languages.languagesRemoved'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
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
        message: 'errorMessages.somethingWentWrong'
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
        message: 'errorMessages.somethingWentWrong'
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

    for (let a = 0; a < languages.length; a++) {
      let trs = languages[a].translations
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
                message: 'errorMessages.translations.alreadyAssignStringValue'
              })
          }
          if (trs[k1] && trs[k1][k2] && trs[k1][k2][k3] && trs[k1][k2][k3][k4] && trs[k1][k2][k3][k4][k5]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'errorMessages.translations.keyAlreadyExist'
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
                message: 'errorMessages.translations.alreadyAssignStringValue'
              })
          }
          if (trs[k1] && trs[k1][k2] && trs[k1][k2][k3] && trs[k1][k2][k3][k4]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'errorMessages.translations.keyAlreadyExist'
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
                message: 'errorMessages.translations.alreadyAssignStringValue'
              })
          }
          if (trs[k1] && trs[k1][k2] && trs[k1][k2][k3]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'errorMessages.translations.keyAlreadyExist'
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
                message: 'errorMessages.translations.alreadyAssignStringValue'
              })
          }
          if (trs[k1] && trs[k1][k2]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'errorMessages.translations.keyAlreadyExist'
              })
          } else {
            obj[k1] = {}
            obj[k1][k2] = req.body.value
          }
        }

        trs = deepmerge(languages[a].translations, obj)
      } else {
        if (languages[a].translations[req.body.key]) {
          return res
            .status(400)
            .json({
              success: false,
              message: 'errorMessages.translations.keyAlreadyExist'
            })
        }
        trs[req.body.key] = req.body.value
      }
      languages[a].translations = trs
      await Lang.findByIdAndUpdate(languages[a]._id, languages[a], {
        useFindAndModify: false
      })
    }

    return res
      .status(200)
      .json({
        success: true,
        message: 'errorMessages.translations.translationCreated'
      })
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
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
            message: 'errorMessages.translations.keyNotExist'
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
        message: 'errorMessages.translations.translationUpdated'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}

// delete translation
exports.deleteTranslation = async (req, res) => {
  try {
    const languages = await Lang.find()
    for (let a = 0; a < languages.length; a++) {
      const trs = languages[a].translations
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
      languages[a].translations = trs
      await Lang.findByIdAndUpdate(languages[a]._id, languages[a], {
        useFindAndModify: false
      })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'errorMessages.translations.translationRemoved'
      })
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}

// delete translations
exports.deleteTranslations = async (req, res) => {
  const translations = req.body
  try {
    const languages = await Lang.find()
    for (let a = 0; a < languages.length; a++) {
      const trs = languages[a].translations
      for (let b = 0; b < translations.length; b++) {
        if (translations[b].includes('.')) {
          const arr = translations[b].split('.', 5)
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
          delete trs[translations[b]]
        }
      }
      languages[a].translations = trs
      await Lang.findByIdAndUpdate(languages[a]._id, languages[a], {
        useFindAndModify: false
      })
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'errorMessages.translations.transationsRemoved'
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'errorMessages.somethingWentWrong',
        error
      })
  }
}
