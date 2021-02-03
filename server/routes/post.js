const express = require('express')

const router = express.Router()
const postController = require('../controllers/post')

router.post('/new', postController.postNewPost)

router.get('/', postController.getPosts)

module.exports = router
