const express = require('express')

const bodyParser = require('body-parser')

const app = express()
const PORT = 3001

const mainRoutes = require('./routes/index')
const apiRoutes = require('./routes/api/wrha')

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', apiRoutes)
app.use(mainRoutes)

app.listen(PORT)
// eslint-disable-next-line no-console
console.log(`Server is live on port ${PORT}`)
