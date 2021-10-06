import express from 'express'
import path from 'path'

// ../util/path.ts
import {root, publicDir} from '../util/path.js'

const router = express.Router()

router.get('/projects/onesnap', (req: any, res: any) => {
  res.sendFile(path.join(root, '..', '..', 'projects', 'onesnap', 'index.php'))
})

router.get('*', (req: any, res: any) => {
  res.sendFile(path.join(publicDir, 'index.html'))
})

router.use((req: any, res: any) => {
  res.status(404).sendFile(path.join(root, 'views', '404.html'))
})

export default router
