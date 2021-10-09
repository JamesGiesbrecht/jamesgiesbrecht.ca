import express from 'express'

// ./plex.ts
import plexRoutes from './plex.js'
// ./wrha.ts
import wrhaRoutes from './wrha.js'
// ./post.ts
import postsRoutes from './post.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Hello from API',
    env: process.env.NODE_ENV || 'Not set',
    port: process.env.PORT || 'Not set',
  })
})

router.use('/posts', postsRoutes)
router.use('/wrha', wrhaRoutes)
router.use('/plex', plexRoutes)

router.use((req, res) => {
  res.status(400).json({
    error: 'API does not exist',
  })
})

export default router
