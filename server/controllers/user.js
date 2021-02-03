const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const client = new OAuth2Client(process.env.GOOGLE_APP_ID)

exports.postGoogleLogin = (req, res) => {
  const { idToken } = req.body
  let name
  let email
  let sub
  let currentUser
  client.verifyIdToken({ idToken, audience: process.env.GOOGLE_APP_ID })
    .then((response) => {
      name = response.payload.name
      email = response.payload.email
      sub = response.payload.sub
      console.log('payload', response.payload)
      return User.findOne({ email })
    })
    .then((user) => {
      if (!user) {
        console.log('First time user')
        const newUser = new User({ email, name, googleSub: sub })
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
