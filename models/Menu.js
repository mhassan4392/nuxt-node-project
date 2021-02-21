const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  items: [
    {
      title: {
        type: String,
        required: true
      },
      icon: String,
      route: String,
      loggedIn: {
        type: Boolean,
        default: true
      },
      loggedOut: {
        type: Boolean,
        default: true
      },
      permission: {
        type: Array,
        default: null
      },
      active: {
        type: Boolean,
        default: false
      },
      translation: {
        type: String,
        default: ''
      },
      children: [
        {
          title: {
            type: String,
            required: true
          },
          icon: String,
          route: String,
          loggedIn: {
            type: Boolean,
            default: true
          },
          loggedOut: {
            type: Boolean,
            default: true
          },
          permission: {
            type: Array,
            default: null
          },
          active: {
            type: Boolean,
            default: false
          },
          translation: {
            type: String,
            default: ''
          },
          children: [
            {
              title: {
                type: String,
                required: true
              },
              icon: String,
              route: String,
              loggedIn: {
                type: Boolean,
                default: true
              },
              loggedOut: {
                type: Boolean,
                default: true
              },
              permission: {
                type: Array,
                default: null
              },
              active: {
                type: Boolean,
                default: false
              },
              translation: {
                type: String,
                default: ''
              }
            }
          ]
        }
      ]
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Menu', MenuSchema)
