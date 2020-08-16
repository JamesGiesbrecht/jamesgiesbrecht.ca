const express = require('express')
const path = require('path')

const rootDir = require('../util/path')

const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'index.html'))
})

router.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

module.exports = router
