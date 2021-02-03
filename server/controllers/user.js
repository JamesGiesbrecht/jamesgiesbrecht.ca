const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const client = new OAuth2Client(process.env.GOOGLE_APP_ID)

exports.postGoogleLogin = (req, res) => {
  const { idToken } = req.body
  client.verifyIdToken({ idToken, audience: process.env.GOOGLE_APP_ID })
    .then((response) => {
      const { email_verified, name, email } = response.payload
      if (email_verified) {
        // See if user email exists in db
        // if (user) {
        //   // user exists
        // } else {
        //   // is new user
        // }

        // create new jwt token
        // return user data and token
      } else {
      //   handle error
      }
      return res.send(response.payload)
    })
    .catch((error) => {
      console.log(error)
      res.send('Error')
    })
}
