/* eslint-disable security/detect-object-injection */
import express from 'express'

// ../../util/scraper.ts
import { scrapeSite } from '../../util/scraper.js'

const router = express.Router()

const hospitals = {
  grace: {
    url: 'grace-hospital',
    friendlyName: 'Grace Hospital',
  },
  hsc: {
    url: 'hsc-adult',
    friendlyName: 'Health Sciences Centre',
  },
  childrens: {
    url: 'hsc-childrens',
    friendlyName: "Children's Hospital",
  },
  'st-boniface': {
    url: 'st-boniface-hospital',
    friendlyName: 'St. Boniface Hospital',
  },
  concordia: {
    url: 'concordia-hospital',
    friendlyName: 'Concordia Hospital',
  },
  'seven-oaks': {
    url: 'seven-oaks-general-hospital',
    friendlyName: 'Seven Oaks General Hospital',
  },
  victoria: {
    url: 'victoria-general-hospital',
    friendlyName: 'Victoria General Hospital',
  },
}

const getMessage = (waitTimes: any, hospitalName: any) =>
  `At ${hospitalName}, there are currently ${waitTimes.waiting} waiting, ${waitTimes.treating} treating, and an average wait time of ${waitTimes.wait_time} hours.`

const getWaitTimes = async (hospital: any) => {
  // @ts-ignore
  const selectedHospital = hospitals[hospital]
  const siteUrl = `https://wrha.mb.ca/wait-times/${selectedHospital.url}`
  const $ = await scrapeSite(siteUrl)
  let waitTime = $('.table-wait-times-data[data-label="Wait Time"]').text()
  waitTime = waitTime.substring(0, waitTime.indexOf(' '))
  const waitTimes = {
    waiting: $('.table-wait-times-data[data-label="Waiting"]').text(),
    treating: $('.table-wait-times-data[data-label="Treating"]').text(),
    wait_time: waitTime,
  }
  const message = getMessage(waitTimes, selectedHospital.friendlyName)
  return {
    ...waitTimes,
    message,
  }
}

router.get('/:hospital', async (req: any, res: any) => {
  const hospital = req.params.hospital.toLowerCase()
  // @ts-ignore
  if (!hospitals[hospital]) {
    return res.status(400).json({ error: 'Hospital not found' })
  }
  const waitTimes = await getWaitTimes(hospital)
  return res.json(waitTimes)
})

export default router