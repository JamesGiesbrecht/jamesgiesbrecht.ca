const express = require('express')

const { scrapeSite } = require('../../util/scraper')

const router = express.Router()

const getGraceWaitTimes = async () => {
  const siteUrl = 'https://wrha.mb.ca/wait-times/grace-hospital'
  const $ = await scrapeSite(siteUrl)
  let waitTime = $('.table-wait-times-data[data-label="Wait Time"]').text()
  waitTime = waitTime.substring(0, waitTime.indexOf(' '))
  return {
    waiting: $('.table-wait-times-data[data-label="Waiting"]').text(),
    treating: $('.table-wait-times-data[data-label="Treating"]').text(),
    wait_time: waitTime,
  }
}

const getMessage = (waitTimes) => (
  `At Grace Hospital, there are currently ${waitTimes.waiting} waiting, ${waitTimes.treating} treating, and an average wait time of ${waitTimes.wait_time} hours.`
)

router.get('/', (req, res) => {
  res.json({
    message: 'Hello from API',
  })
})

router.get('/wrha/grace', async (req, res) => {
  const waitTimes = await getGraceWaitTimes()
  const message = getMessage(waitTimes)
  res.json({
    ...waitTimes,
    message,
  })
})

module.exports = router
