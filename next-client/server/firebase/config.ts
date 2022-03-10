import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.ADMIN_SERVICE_ACCOUNT_JSON_CONFIG || ''),
  ),
})

// eslint-disable-next-line import/prefer-default-export
export const adminAuth = admin.auth()
