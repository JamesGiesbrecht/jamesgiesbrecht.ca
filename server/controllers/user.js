const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const client = new OAuth2Client(process.env.GOOGLE_APP_ID)

exports.postGoogleLogin = (req, res) => {
  const { idToken } = req.body
  let payload
  let name
  let email
  let sub
  let currentUser
  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_APP_ID })
    .then((response) => {
      payload = response.payload
      email = response.payload.email
      console.log('payload', response.payload)
      return User.findOne({ email })
    })
    .then((user) => {
      if (!user) {
        console.log('First time user')
        const newUser = new User({ email: payload.email, name: payload.name, google: payload })
        currentUser = newUser
        return newUser.save()
      }
      console.log('Found user')
      currentUser = user
    })
    .then((result) => {
      res.send({ user: currentUser })
    })
    .catch((error) => {
      console.log(error)
      res.send('Error')
    })
}
