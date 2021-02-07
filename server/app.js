const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const express = require('express')

const bodyParser = require('body-parser')
const { public } = require('./util/path')

const app = express()
const PORT = process.env.PORT || 3001

const mainRoutes = require('./routes/index')
const apiRoutes = require('./routes/api/index')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(public))

app.use('/api', apiRoutes)
app.use(mainRoutes)

app.listen(PORT)
// eslint-disable-next-line no-console
console.log(`Server is live on port ${PORT}`)
