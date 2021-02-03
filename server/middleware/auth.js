const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    // authenticate user on each request
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      if (token) {
        const decodedData = jwt.decode(token)
        console.log('decoded', decodedData)
        console.log('User authenticated')
      }
    }
    next()
  } catch (error) {
    console.error('Error Authenticating', error)
  }
}

module.exports = auth
