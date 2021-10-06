// ../firebase/config.ts
import { adminAuth } from '../firebase/config.js'

const auth = (req: any, res: any, next: any) => {
  try {
    // authenticate user on each request
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      adminAuth
        .verifyIdToken(token)
        .then((decodedToken: any) => {
          const { uid, email } = decodedToken
          req.user = { uid, username: email?.split('@')[0] }
          next()
        })
        .catch((err: any) => {
          console.log('Error decoding token', err)
          throw err
        })
    } else {
      console.log('No Authorization token provided')
      next()
    }
  } catch (error) {
    console.error('Error Authenticating', error)
    res.status(500).send('Something went wrong')
  }
}

export default auth
