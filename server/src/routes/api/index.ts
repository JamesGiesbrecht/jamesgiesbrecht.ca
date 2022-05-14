import express from 'express'

import plexRoutes from './plex'
import postsRoutes from './post'
import unraidRoutes from './unraid'
import wrhaRoutes from './wrha'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({
    message: 'Hello from API',
    env: process.env.NODE_ENV || 'Not set',
    port: process.env.PORT || 'Not set',
  })
})

router.use('/posts', postsRoutes)
router.use('/wrha', wrhaRoutes)
router.use('/plex', plexRoutes)
router.use('/unraid', unraidRoutes)

router.use((_req, res) => {
  res.status(400).json({
    error: 'API does not exist',
  })
})

export default router
