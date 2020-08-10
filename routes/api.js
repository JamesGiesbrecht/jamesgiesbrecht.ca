const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req)
  res.json({
    data: {
      message: 'Hello from API',
    },
  })
})

router.get('/wrha/grace', (req, res) => {
  res.json({
    data: {
      waiting: 10,
      treating: 33,
      wait_time: 3.5,
    },
  })
})

module.exports = router
