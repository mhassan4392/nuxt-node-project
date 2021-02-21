const fs = require('fs')
const data = {}
const dir = './seed/data/menus/'
fs.readdirSync(dir).forEach(function (file) {
  data[file.replace(/\.json$/, '')] = require('.' + dir + file)
})

// import menu model
const Menu = require('../models/Menu')

const seedMenus = new Promise((resolve, reject) => {
  const add = async () => {
    for (const name in data) {
      const m = await Menu.findOne({ slug: name })
      if (!m) {
        await Menu.create(data[name])
        console.log(name + ' menu created')
      } else {
        console.log(name + ' menu already exist')
      }
    }
    resolve()
  }
  add()
})

module.exports = seedMenus
