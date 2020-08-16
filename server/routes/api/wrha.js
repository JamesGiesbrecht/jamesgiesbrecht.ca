const express = require('express')

const { scrapeSite } = require('../../util/scraper')

const router = express.Router()

const hospitals = {
  grace: 'grace-hospital',
  hsc: 'hsc-adult',
  childrens: 'hsc-childrens',
  'st-boniface': 'st-boniface-hospital',
  concordia: 'concordia-hospital',
  'seven-oaks': 'seven-oaks-general-hospital',
  victoria: 'victoria-general-hospital',
}

const getWaitTimes = async (hospital) => {
  if (!hospitals[hospital]) {
    return { message: 'Error: Hospital not found' }
  }
  const siteUrl = `https://wrha.mb.ca/wait-times/${hospitals[hospital]}`
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

router.get('/:hospital', async (req, res) => {
  const waitTimes = await getWaitTimes(req.params.hospital)
  const message = getMessage(waitTimes)
  res.json({
    ...waitTimes,
    message,
  })
})

module.exports = router
