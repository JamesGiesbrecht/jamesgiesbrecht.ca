const express = require('express')

const router = express.Router()
const authController = require('../controllers/user')

router.post('/google-login', authController.postGoogleLogin)

module.exports = router
