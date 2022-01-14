import express from 'express'
import path from 'path'

import { root, publicDir } from '../util/path'

const router = express.Router()

router.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'))
})

router.use((_req, res) => {
  res.status(404).sendFile(path.join(root, 'views', '404.html'))
})

export default router
