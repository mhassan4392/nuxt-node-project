const data = require('./data/language.json')

const Lang = require('../models/Lang')

const seedLanguage = new Promise((resolve, reject) => {
  try {
    const add = async () => {
      const r = await Lang.findOne({ locale: data.locale })
      if (!r) {
        await Lang.create(data)
        console.log('language create')
      } else {
        console.log('language exist')
      }

      resolve()
    }
    add()
  } catch (error) {
    reject(error)
  }
})

module.exports = seedLanguage
