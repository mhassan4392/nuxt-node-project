const fs = require('fs')
const data = {}
const dir = './seed/data/settings/'
fs.readdirSync(dir).forEach(function (file) {
  data[file.replace(/\.json$/, '')] = require('.' + dir + file)
})

// import settings model
const Setting = require('../models/Setting')

const seedSettings = new Promise((resolve, reject) => {
  const add = async () => {
    for (const name in data) {
      const s = await Setting.findOne({ name: name })
      if (!s) {
        await Setting.create({
          name: name,
          settings: data[name]
        })
        console.log(name + ' setting created')
      } else {
        console.log(s.name + ' settings already exist')
      }
    }
    resolve()
  }
  add()
})

module.exports = seedSettings
