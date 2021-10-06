import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.ADMIN_SERVICE_ACCOUNT_JSON_CONFIG || '')),
})

export const adminAuth = admin.auth()
