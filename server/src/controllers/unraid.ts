/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { RequestHandler } from 'express'
import puppeteer, { Page } from 'puppeteer'

const UNRAID_BASE_URL = process.env.UNRAID_URL
const { UNRAID_USER, UNRAID_PASSWORD } = process.env

const getPage = async (url: string): Promise<Page> => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto(url)
  return page
}

const getText = async (page: Page, selector: string, notEmpty?: boolean): Promise<string> => {
  try {
    if (notEmpty) {
      await page.waitForSelector(`${selector}:not(:empty)`)
    }
    const text = await page.$eval(selector, (el) => el.textContent)
    return text ? text.toString() : ''
  } catch (e) {
    console.error(`Error Grabbing Text with selector: ${selector}`, e)
    return ''
  }
}

const loginToUnraid = async (): Promise<Page> => {
  if (!UNRAID_BASE_URL) throw new Error('Unraid url environment variable is not set')
  const page = await getPage(UNRAID_BASE_URL)
  if (UNRAID_USER && UNRAID_PASSWORD) {
    await page.type('input[name="username"]', UNRAID_USER || '')
    await page.type('input[name="password"]', UNRAID_PASSWORD || '')
  } else {
    throw new Error(`Error logging into Unraid, user or password environment variables are not set`)
  }
  await page.click('button[type="submit"]')
  await page.waitForNavigation()
  return page
}

const getDriveTemps = async (page: Page, driveTableSelector: string): Promise<string> => {
  await page.waitForSelector(`${driveTableSelector}:not(:empty)`)
  const tableLength = await page.$$eval(`${driveTableSelector} > tr`, (el) => el.length)
  const drives: string[] = []
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < Number(tableLength) + 1; i++) {
    const [driveName, driveTemp] = await Promise.all([
      page.evaluate(
        (el) => el.innerText,
        await page.$(`${driveTableSelector} > tr:nth-child(${i}) > td:nth-child(2)`),
      ),
      page.evaluate(
        (el) => el.innerText,
        await page.$(`${driveTableSelector} > tr:nth-child(${i}) > td:nth-child(4)`),
      ),
    ])
    drives.push(`${driveName.trim()}: ${driveTemp}`.replace(' C', ' °C'))
  }

  return drives.join('\n')
}

const unraidStats = {
  cpuTemp: async (page: Page): Promise<string> => {
    const text = await getText(page, '#cpu-temp', true)
    return text.replace('Temperature: ', '')
  },
  cpuLoad: async (page: Page): Promise<string> =>
    getText(page, '#db-box1 > tbody:nth-child(6) > tr:nth-child(3) > td:nth-child(3) > span'),
  gpuTemp: async (page: Page): Promise<string> =>
    getText(
      page,
      '#db-box1 > tbody:nth-child(19) > tr:nth-child(1) > td.next.ui-sortable-handle > div > span:nth-child(3) > span',
      true,
    ),
  gpuLoad: async (page: Page): Promise<string> =>
    getText(
      page,
      '#db-box1 > tbody:nth-child(19) > tr:nth-child(3) > td:nth-child(3) > span',
      true,
    ),
  memoryUsage: async (page: Page): Promise<string> => {
    const decimalRegex = /[\d.]+/g
    const memoryInfo = await Promise.all([
      getText(page, '#db-box1 > tbody:nth-child(8) > tr:nth-child(3) > td:nth-child(2)'),
      getText(page, '#db-box1 > tbody:nth-child(8) > tr:nth-child(2) > td:nth-child(3) > span'),
    ])

    const [memoryCapacity, memoryUtilization] = memoryInfo.map((text) => text.match(decimalRegex))

    let memoryUsed = 0
    if (memoryUtilization && memoryCapacity) {
      memoryUsed = parseFloat(memoryCapacity[0]) * (parseFloat(memoryUtilization[0]) / 100)
      return `${memoryUsed} GiB of ${memoryCapacity[0]} GiB (${memoryUtilization[0]}%)`
    }
    return ''
  },
  uptime: async (page: Page): Promise<string> =>
    getText(
      page,
      '#db-box1 > tbody.sys_view.sortable > tr > td:nth-child(2) > div.left > span.uptime',
    ),
  upsStatus: async (page: Page): Promise<string> =>
    (await getText(page, '#db-box1 > tbody:nth-child(14) > tr.ups_view > td:nth-child(2)'))
      .replace(new RegExp(':', 'g'), ': ')
      .replace(' Percent', '%'),
  arrayUsage: async (page: Page): Promise<string> =>
    getText(
      page,
      '#db-box2 > thead:nth-child(3) > tr:nth-child(1) > td.next.ui-sortable-handle > span',
    ),
  cacheUsage: async (page: Page): Promise<string> =>
    getText(
      page,
      '#db-box2 > thead:nth-child(5) > tr:nth-child(1) > td.next.ui-sortable-handle > span',
    ),
  arrayTemps: async (page: Page): Promise<string> => getDriveTemps(page, '#array_list'),
  cacheTemps: async (page: Page): Promise<string> => getDriveTemps(page, '#cache_list0'),
  unassignedTemps: async (page: Page): Promise<string> => getDriveTemps(page, '#extra_list'),
}

/* eslint-disable security/detect-object-injection */
export const getUnraidStats: RequestHandler = async (_req, res) => {
  try {
    const page = await loginToUnraid()
    await page.goto(`${UNRAID_BASE_URL}Dashboard`)
    const statFunctionNames = Object.keys(unraidStats) as (keyof typeof unraidStats)[]
    const statsArray = await Promise.all(
      statFunctionNames.map((statFunctionName) => unraidStats[statFunctionName](page)),
    )
    const stats: { [key in keyof typeof unraidStats]?: string } = {}
    statsArray.forEach((stat, index) => {
      stats[statFunctionNames[index]] = stat
    })

    res.json(stats)
  } catch (e) {
    console.error('Error fetching Unraid Stats', e)
    res.status(500).json({ error: e })
  }
}
