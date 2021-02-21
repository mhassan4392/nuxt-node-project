const seedSettings = require('./settings-seeder')
const seedRoles = require('./roles-seeder')
const seedLanguage = require('./language-seeder')
const seedMenus = require('./menus-seeder')

const dotenv = require('dotenv')
// load env vars
dotenv.config({ path: './config/config.env' })

// load db connect function
const { connectDB, disconnectDB } = require('../db/connect')

// connect db
connectDB()

// const flag = process.argv[2]

const arr = [
  seedRoles,
  seedMenus,
  seedLanguage,
  seedSettings
]

// switch (flag) {
//   case '--all':
//     arr = [
//       seedRoles,
//       seedMenus,
//       seedLanguage,
//       seedSettings
//     ]
//     break
//   case '--roles':
//     arr = [seedRoles]
//     break
//   case '--settings':
//     arr = [seedSettings]
//     break
//   case '--language':
//     arr = [seedLanguage]
//     break
//   case '--menus':
//     arr = [seedMenus]
//     break
//   default:
//     arr = [
//       seedRoles,
//       seedMenus,
//       seedLanguage,
//       seedSettings
//     ]
// }

// finish all promises first
Promise.all(arr)
  .then(() => {
    // disconnect db
    disconnectDB()
  })
  .catch((err) => {
    // console error
    console.log(err)
    // disconnect db
    disconnectDB()
  })
