import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// ./util/path.ts
import { root, publicDir } from './util/path.js'
// ./routes/main.ts
import mainRoutes from './routes/main.js'
// ./routes/api/index.ts
import apiRoutes from './routes/api/index.js'

const app = express()
const PORT = process.env.PORT || 3001
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_PARAMS } = process.env

if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(publicDir))
app.set('trust proxy', true)
app.use((req, res, next) => {
  const ip = req.header('x-forwarded-for') || req.connection.remoteAddress
  if (ip) req.endUserIp = ip
  next()
})

app.use('/api', apiRoutes)
app.use(mainRoutes)

if (!MONGODB_URL) {
  throw new Error(
    'No MongoDB url provided. You must supply an environment variable MONGODB_URL with following format.\nmongodb://USER:PASSWORD@{server-uri}/{database-name}',
  )
} else if (!MONGODB_USER || !MONGODB_PASSWORD) {
  throw new Error(
    'Insufficient MongoDB credentials provided. Provide the username and password in MONGODB_USER and MONGODB_PASSWORD.',
  )
}
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
