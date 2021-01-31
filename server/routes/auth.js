const express = require('express')

const router = express.Router()
const authController = require('../controllers/auth')

router.post('/google-login', authController.postGoogleLogin)

module.exports = router
