import express from 'express'

// ../../middleware/auth.ts
import auth from '../../middleware/auth.js'
// ../../controllers/post.ts
import {postNewPost, deletePost, updatePost, getPosts} from '../../controllers/post.js'

const router = express.Router()

router.post('/new', auth, postNewPost)

router.delete('/:postId', auth, deletePost)

router.put('/:postId', auth, updatePost)

router.get('/', auth, getPosts)

export default router
