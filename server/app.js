const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { public } = require('./util/path')

const app = express()
const PORT = process.env.PORT || 3001
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_PARAMS } = process.env

const mainRoutes = require('./routes/main')
const apiRoutes = require('./routes/api/index')

if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(public))
app.set('trust proxy', true)
app.use((req, res, next) => {
  const ip = req.header('x-forwarded-for') || req.connection.remoteAddress
  req.ip = ip
  next()
})

app.use('/api', apiRoutes)
app.use(mainRoutes)

const mongoDbUrl =
  MONGODB_URL.replace('USER', MONGODB_USER).replace('PASSWORD', MONGODB_PASSWORD) + MONGODB_PARAMS

const connectToMongoDb = () =>
  mongoose
    .connect(mongoDbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error))

mongoose.connection.on('disconnected', (error) => {
  console.warn('Mongoose disconnect event', error)
  connectToMongoDb()
})

mongoose.connection.on('error', (error) => {
  console.warn('Mongoose error event', error)
  connectToMongoDb()
})

connectToMongoDb()
console.log(`Server is live on port ${PORT}`)
app.listen(PORT)
