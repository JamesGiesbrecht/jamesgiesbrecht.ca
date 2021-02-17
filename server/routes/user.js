const express = require('express')

const router = express.Router()
const userController = require('../controllers/user')

router.post('/google-login', userController.postGoogleLogin)

module.exports = router
