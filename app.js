const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const bodyParser = require('body-parser')

const app = express()
const PORT = 3001

const apiRoutes = require('./routes/api')

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', apiRoutes)

app.listen(PORT)
// eslint-disable-next-line no-console
console.log(`Server is live on port ${PORT}`)

const siteUrl = 'https://wrha.mb.ca/wait-times/grace-hospital'
const fetchData = async () => {
  const result = await axios.get(siteUrl)
  console.log(cheerio.load(result.data)('.table-wait-times-data[data-label="Waiting"]').text())
  return cheerio.load(result.data)
}

fetchData()
