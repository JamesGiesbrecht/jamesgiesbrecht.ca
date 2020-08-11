const express = require('express')

const bodyParser = require('body-parser')

const app = express()
const PORT = 3001

const apiRoutes = require('./routes/api')

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', apiRoutes)

app.listen(PORT)
// eslint-disable-next-line no-console
console.log(`Server is live on port ${PORT}`)
