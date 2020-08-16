const express = require('express')

const wrhaRoutes = require('./wrha')

const router = express.Router()

router.use('/wrha', wrhaRoutes)

router.use((req, res) => {
  res.status(400).json({
    message: 'Error: API does not exist',
  })
})

module.exports = router
