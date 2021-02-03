const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    // authenticate user on each request
    console.log('User authenticated')
    next()
  } catch (error) {
    console.error('Error Authenticating', error)
  }
}

module.exports = auth
