const express = require('express')

const { scrapeSite } = require('../util/scraper')

const router = express.Router()

const getGraceWaitTimes = async () => {
  const siteUrl = 'https://wrha.mb.ca/wait-times/grace-hospital'
  const $ = await scrapeSite(siteUrl)
  return {
    waiting: $('.table-wait-times-data[data-label="Waiting"]').text(),
    treating: $('.table-wait-times-data[data-label="Treating"]').text(),
    wait_time: $('.table-wait-times-data[data-label="Wait Time"]').text(),
  }
}

router.get('/', (req, res) => {
  console.log(req)
  res.json({
    data: {
      message: 'Hello from API',
    },
  })
})

router.get('/wrha/grace', async (req, res) => {
  const waitTimes = await getGraceWaitTimes()
  res.json({
    data: waitTimes,
  })
})

module.exports = router
