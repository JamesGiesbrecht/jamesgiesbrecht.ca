import express from 'express'

import { postNewPost, deletePost, updatePost, getPosts } from '../../controllers/post'
import auth from '../../middleware/auth'

const router = express.Router()

router.post('/new', auth, postNewPost)

router.delete('/:postId', auth, deletePost)

router.put('/:postId', auth, updatePost)

router.get('/', auth, getPosts)

export default router
