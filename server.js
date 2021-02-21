/* eslint-disable no-path-concat */
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const PORT = process.env.port || 5000

// load env vars
dotenv.config({ path: './config/config.env' })

// load db connect function
const { connectDB } = require('./db/connect')
// connect db
connectDB()

// initialize app
const app = express()

// middlewares
// body parser middleware
app.use(express.json())
// path middleware
app.use(express.static(path.join(__dirname, 'public')))
// cors middleware
app.use(cors())
// express fileupload middleware
app.use(fileUpload())

// load routes
const auth = require('./routes/auth')
const categories = require('./routes/categories')
const tags = require('./routes/tags')
const posts = require('./routes/posts')
const comments = require('./routes/comments')
const replies = require('./routes/replies')
const images = require('./routes/images')
const newsletter = require('./routes/newsletter')
const inquiries = require('./routes/inquiries')
const langs = require('./routes/languages')
const notifications = require('./routes/notifications')
const users = require('./routes/users')
const settings = require('./routes/settings')
const contacts = require('./routes/contacts')
const icons = require('./routes/icons')
const pages = require('./routes/pages')
const menus = require('./routes/menus')
const roles = require('./routes/roles')
const modules = require('./routes/modules')

// load routes
app.use('/api/auth', auth)
app.use('/api/categories', categories)
app.use('/api/tags', tags)
app.use('/api/posts', posts)
app.use('/api/comments', comments)
app.use('/api/replies', replies)
app.use('/api/images', images)
app.use('/api/newsletter', newsletter)
app.use('/api/inquiries', inquiries)
app.use('/api/langs', langs)
app.use('/api/notifications', notifications)
app.use('/api/users', users)
app.use('/api/settings', settings)
app.use('/api/contacts', contacts)
app.use('/api/icons', icons)
app.use('/api/pages', pages)
app.use('/api/menus', menus)
app.use('/api/roles', roles)
app.use('/api/modules', modules)

// handle productios
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/dist/'))

  // send public/html for every rouote
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/dist/index.html'))
}

// listen server
app.listen(PORT, () => console.log(`server started on the port ${PORT}`))
