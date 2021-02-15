const express = require('express')
const auth = require('../../middleware/auth')

const router = express.Router()
const postController = require('../../controllers/post')

router.post('/new', auth, postController.postNewPost)

router.delete('/:postId', auth, postController.deletePost)

router.put('/:postId', auth, postController.updatePost)

router.get('/', auth, postController.getPosts)

module.exports = router
