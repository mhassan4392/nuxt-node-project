const data = require('./data/roles.json')

const Role = require('../models/Role')

const seedRoles = new Promise((resolve, reject) => {
  let count = 0
  data.forEach(async (role) => {
    const r = await Role.findOne({ title: role.title })
    if (!r) {
      await Role.create(role)
      console.log(role.title + ' role created')
    } else {
      console.log(r.title + ' already exist')
    }
    if (count === data.length - 1) {
      resolve()
    }
    count++
  })
})

module.exports = seedRoles
