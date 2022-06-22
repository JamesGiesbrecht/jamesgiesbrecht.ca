import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import nextJs from 'next'
import mongoose from 'mongoose'

import apiRoutes from './routes/api/index'

const PORT = process.env.PORT || 3001
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_PARAMS, NODE_ENV } = process.env
const dev = NODE_ENV !== 'production'

const nextApp = nextJs({
  dev,
  conf: {
    serverRuntimeConfig: {
      SERVER_PORT: PORT,
    },
  },
})
const handle = nextApp.getRequestHandler()

const startServer = async () =>
  nextApp
    .prepare()
    .then(() => {
      const expressApp = express()

      if (dev) {
        expressApp.use(cors())
      }

      expressApp.use(bodyParser.json())
      expressApp.use(bodyParser.urlencoded({ extended: false }))
      expressApp.set('trust proxy', true)
      expressApp.use((req, _res, next) => {
        const ip = req.header('x-forwarded-for') || req.connection.remoteAddress
        if (ip) req.endUserIp = ip
        next()
      })

      expressApp.use('/api', apiRoutes)
      expressApp.get('*', (_req, res) => handle(_req, res))

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
        MONGODB_URL.replace('USER', MONGODB_USER).replace('PASSWORD', MONGODB_PASSWORD) +
        MONGODB_PARAMS

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
      expressApp.listen(PORT)
    })
    .catch((error) => {
      console.error('Error starting server', error)
    })

startServer()
