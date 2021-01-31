const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_APP_ID)

exports.postGoogleLogin = (req, res) => {
  const { idToken } = req.body
  client.verifyIdToken({ idToken, audience: process.env.GOOGLE_APP_ID })
    .then((response) => {
      const { email_verified, name, email } = response.payload
      console.log(response.payload)
    })
  res.send('<h1>Google Login</h1>')
}
