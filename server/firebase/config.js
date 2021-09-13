const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.ADMIN_SERVICE_ACCOUNT_JSON_CONFIG)),
})

const adminAuth = admin.auth()

module.exports = { adminAuth }
