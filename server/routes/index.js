const express = require('express')
const path = require('path')

const { root, public } = require('../util/path')

const router = express.Router()
const authRoutes = require('./auth')

router.use(authRoutes)

router.get('/projects/onesnap', (req, res) => {
  res.sendFile(path.join(root, '..', '..', 'projects', 'onesnap', 'index.php'))
})

router.get('*', (req, res) => {
  res.sendFile(path.join(public, 'index.html'))
})

router.use((req, res) => {
  res.status(404).sendFile(path.join(root, 'views', '404.html'))
})

module.exports = router
