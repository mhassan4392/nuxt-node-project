const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
// load env vars
dotenv.config({ path: './config/config.env' })

const { connectDB, disconnectDB } = require('../db/connect')

const Role = require('../models/Role')
const User = require('../models/User')

connectDB()

const name = process.argv[2]
const email = process.argv[3]
let password = process.argv[4]

const createUser = async () => {
  try {
    const r = await Role.findOne({ title: 'admin' })
    if (r) {
      const user = await User.findOne({ role: r._id })
      if (user) {
        console.log('admin user already exist')
        await disconnectDB()
      } else {
        if (name && email && password) {
          if (await User.findOne({ email })) {
            console.log('user with that email already exist')
          } else {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            password = hash
            await User.create({
              name,
              email,
              password,
              role: r._id
            })
            console.log('user created with email: ' + email)
          }
        } else {
          console.log('require 3 arguments')
          console.log('first name')
          console.log('second email')
          console.log('third password')
        }
      }
    } else {
      console.log('admin role not exist')
    }
    await disconnectDB()
  } catch (error) {
    console.log(error)
    await disconnectDB()
  }
}

createUser()
