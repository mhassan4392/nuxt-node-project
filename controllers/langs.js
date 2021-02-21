const fs = require('fs')
const langs = require('../localization/langs.json')
const en = require('../localization/locales/en.json')
var data = {}
var dir = './localization/locales/'
fs.readdirSync(dir).forEach(function (file) {
  data[file.replace(/\.json$/, '')] = require('.' + dir + file)
})
// get all langs
exports.getLangs = async (req, res, next) => {
  try {
    // const langs = await Lang.find()
    const langsArr = []
    for (const [key, value] of Object.entries(langs)) {
      const obj = { locale: key, name: value }
      langsArr.push(obj)
    }

    const trs = []
    for (const [key, value] of Object.entries(data[req.query.locale ? req.query.locale : 'en'])) {
      if (typeof value === 'object') {
        for (const [k, v] of Object.entries(value)) {
          if (typeof v === 'object') {
            for (const [a, b] of Object.entries(v)) {
              trs.push({
                key: key + '.' + k + '.' + a,
                value: b
              })
            }
          } else {
            trs.push({
              key: key + '.' + k,
              value: v
            })
          }
        }
      } else {
        trs.push({
          key,
          value
        })
      }
    }

    return res
      .status(200)
      .json({
        success: true,
        count: langsArr.length,
        langs: langsArr,
        translations: data,
        trs
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

// get translations
exports.getTranslations = async (req, res, next) => {
  try {
    const translations = []
    for (const [key, value] of Object.entries(data[req.query.locale ? req.query.locale : 'en'])) {
      if (typeof value === 'object') {
        for (const [k, v] of Object.entries(value)) {
          if (typeof v === 'object') {
            for (const [a, b] of Object.entries(v)) {
              translations.push({
                key: key + '.' + k + '.' + a,
                value: b
              })
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

    console.log(translations)

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

exports.getLang = async (req, res, next) => {

}

// add a new lang
exports.addLang = async (req, res, next) => {
  const { locale, name } = req.body
  try {
    // const data = await Lang.findOne({name:req.body.name})
    const langsNames = []
    const langsLocales = []
    for (const [key, value] of Object.entries(langs)) {
      langsNames.push(value)
      langsLocales.push(key)
    }
    // check if name existed
    if (langsNames.includes(name)) {
      return res
        .status(400)
        .json({
          success: true,
          message: 'Lang already existed with this name'
        })
    }
    // check if locale existed
    if (langsLocales.includes(locale)) {
      return res
        .status(400)
        .json({
          success: true,
          message: 'Lang already existed with this locale'
        })
    }

    langs[locale] = name

    const json = JSON.stringify(langs)
    fs.appendFileSync(`./localization/locales/${locale}.json`, JSON.stringify(en))
    // fs.writeFileSync
    fs.writeFileSync('./localization/langs.json', json)
    // const lang = await Lang.create(req.body)
    return res
      .status(200)
      .json({
        success: true,
        message: 'Lang added successfuly'
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

// delete lang
exports.deleteLang = async (req, res, next) => {
  const { locale } = req.params
  console.log(locale)
  try {
    // const lang = await Lang.findById(id)
    // await lang.remove()
    if (locale === 'en') {
      return res
        .status(400)
        .json({
          success: true,
          message: 'This Language Can not be deleted'
        })
    }
    const json = langs
    delete json[locale]
    fs.writeFileSync('./localization/langs.json', JSON.stringify(json))
    fs.unlinkSync(`./localization/locales/${locale}.json`)
    console.log(json)
    return res
      .status(200)
      .json({
        success: true,
        message: 'Lang deleted successfuly'
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

// update lang
exports.updateLang = async (req, res, next) => {
  const { locale } = req.params
  const newLocale = req.body.locale
  const newName = req.body.name
  try {
    // if locale is en then it can not be updated
    if (locale === 'en') {
      return res
        .status(400)
        .json({
          success: true,
          message: 'This Language Can not be updated'
        })
    }
    // const lang = await Lang.findByIdAndUpdate(id, req.body)
    const newLangs = langs
    // get pre locale
    const preName = newLangs[locale]

    // if both are same then no need to update anything but send ok status
    if (newLocale === locale && newName === preName) {
      return res
        .status(200)
        .json({
          success: true
        })
    }

    // if locale is same but name is changed
    if (newLocale === locale && newName !== preName) {
      console.log('name is changed')
      newLangs[locale] = newName
      fs.writeFileSync('./localization/langs.json', JSON.stringify(newLangs))
      return res
        .status(200)
        .json({
          success: true
        })
    }

    if (newLocale !== locale && newName === preName) {
      delete newLangs[locale]
      newLangs[newLocale] = newName
      fs.writeFileSync('./localization/langs.json', JSON.stringify(newLangs))
      fs.renameSync(`./localization/locales/${locale}.json`, `./localization/locales/${newLocale}.json`)
      return res
        .status(200)
        .json({
          success: true
        })
    }

    if (newLocale !== locale && newName !== preName) {
      delete newLangs[locale]
      newLangs[newLocale] = newName
      fs.writeFileSync('./localization/langs.json', JSON.stringify(newLangs))
      fs.renameSync(`./localization/locales/${locale}.json`, `./localization/locales/${newLocale}.json`)
      return res
        .status(200)
        .json({
          success: true
        })
    }

    return res
      .status(200)
      .json({
        success: true,
        message: 'Lang updated successfuly'
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

// add Translation
exports.addTranslation = async (req, res) => {
  try {
    for (const [key, value] of Object.entries(data)) {
      if (req.body.key.includes('.')) {
        const arr = req.body.key.split('.', 3)
        const k1 = arr[0]
        const k2 = arr[1]
        const k3 = arr[2]
        // check if k3 exist
        if (k3) {
          // check if the value with k3 exist
          if (value[k1] && value[k1][k2] && value[k1][k2][k3]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'key 3 exist'
              })
          } else {
            // if value with k3 not exist
            if (value[k1] && value[k1][k2]) {
              value[k1][k2][k3] = req.body.value
            } else {
              value[k1] = {}
              value[k1][k2] = {}
              value[k1][k2][k3] = req.body.value
            }
          }
        } else {
          if (value[k1] && value[k2]) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'key 2 exist'
              })
          } else {
            if (value[k1]) {
              value[k1][k2] = req.body.value
            } else {
              value[k1] = {}
              value[k1][k2] = req.body.value
            }
          }
        }
        fs.writeFileSync('./localization/locales/' + key + '.json', JSON.stringify(data[key]))
      } else {
        if (value[req.body.key]) {
          return res
            .status(400)
            .json({
              success: false,
              message: 'key 1 exist'
            })
        }
        value[req.body.key] = req.body.value
        fs.writeFileSync('./localization/locales/' + key + '.json', JSON.stringify(data[key]))
      }
    }
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

// update Translation
exports.updateTranslation = async (req, res) => {
  try {
    if (req.body.key.includes('.')) {
      const arr = req.body.key.split('.', 2)
      const v1 = arr[0]
      const v2 = arr[1]
      if (data[req.params.key][v1]) {
        if (data[req.params.key][v1][v2]) {
          data[req.params.key][v1][v2] = req.body.value
          fs.writeFileSync('./localization/locales/' + req.params.key + '.json', JSON.stringify(data[req.params.key]))
        } else {
          return res
            .status(400)
            .json({
              success: false,
              message: 'translation_not_found'
            })
        }
      } else {
        return res
          .status(400)
          .json({
            success: false,
            message: 'translation_not_found'
          })
      }
    } else {
      if (data[req.params.key]) {
        data[req.params.key][req.body.key] = req.body.value
        fs.writeFileSync('./localization/locales/' + req.params.key + '.json', JSON.stringify(data[req.params.key]))
      } else {
        return res
          .status(400)
          .json({
            success: false,
            message: 'translation_not_found'
          })
      }
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'translation_updated'
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

// delete Translation
exports.deleteTranslation = async (req, res) => {
  try {
    for (const [key, value] of Object.entries(data)) {
      if (req.params.key.includes('.')) {
        const arr = req.params.key.split('.', 2)
        const v1 = arr[0]
        const v2 = arr[1]
        if (value[v1][v2]) {
          delete value[v1][v2]
          if (Object.keys(value[v1]).length === 0) {
            delete value[v1]
          }
        }
        fs.writeFileSync('./localization/locales/' + key + '.json', JSON.stringify(data[key]))
      } else {
        delete value[req.params.key]
        fs.writeFileSync('./localization/locales/' + key + '.json', JSON.stringify(data[key]))
      }
    }
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
