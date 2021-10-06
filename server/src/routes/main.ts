import express from 'express'
import path from 'path'

// ./util/path.ts
import { root, publicDir } from './util/path.js'

const router = express.Router()

router.get('/projects/onesnap', (req, res) => {
  res.sendFile(path.join(root, '..', '..', 'projects', 'onesnap', 'index.php'))
})

router.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'))
})

router.use((req, res) => {
  res.status(404).sendFile(path.join(root, 'views', '404.html'))
})

export default router
