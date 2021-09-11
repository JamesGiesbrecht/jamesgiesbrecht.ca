const { adminAuth } = require('../firebase/config')

const auth = (req, res, next) => {
  try {
    // authenticate user on each request
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      console.log(req.headers.authorization)
      adminAuth
        .verifyIdToken(token)
        .then((decodedToken) => {
          console.log(decodedToken)
        })
        .catch((err) => {
          console.log('Error decoding token', err)
          throw err
        })
      next()
    } else {
      console.log('No Authorization token provided')
      next()
    }
  } catch (error) {
    console.error('Error Authenticating', error)
    res.status(500).send('Something went wrong')
  }
}

module.exports = auth
