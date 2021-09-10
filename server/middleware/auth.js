const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = (req, res, next) => {
  try {
    // authenticate user on each request
    // if (req.headers.authorization) {
    //   const token = req.headers.authorization.split(' ')[1]
    //   const decodedData = jwt.decode(token)
    //   User.findOne({ email: decodedData.email })
    //     .then((user) => {
    //       if (!user) {
    //         console.log('User not found', decodedData)
    //         next()
    //       } else {
    //         console.log('User authenticated')
    //         req.user = user
    //         next()
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('Error finding user', err)
    //       throw err
    //     })
    req.user = 'james'
    next()
    // } else {
    //   console.log('No Authorization token provided')
    //   next()
    // }
  } catch (error) {
    console.error('Error Authenticating', error)
    res.status(500).send('Something went wrong')
  }
}

module.exports = auth
