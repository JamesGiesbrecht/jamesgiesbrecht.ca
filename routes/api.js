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

module.exports = router
