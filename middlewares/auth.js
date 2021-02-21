// load dependencies
const jwt = require('jsonwebtoken')
// load models
const User = require('../models/User')

// authenticated middleware to check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  let token
  // check the req headers for token if it exists and starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    // if token not exists return error
    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: 'errorMessages.auth.tokenNotFound'
        })
    }
    // if token exists verify it
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
      // set the req user to decoded user
      req.user = await User.findById(decoded.id)
      next()
    } catch (error) {
      // if token not verified return error
      return res
        .status(401)
        .json({
          success: false,
          message: 'errorMessages.auth.tokenNotVerified'
        })
    }
  } else {
    // if authorization header not exists
    return res
      .status(401)
      .json({
        success: false,
        message: 'errorMessages.auth.authorizationHeaderNotExist'
      })
  }
}
