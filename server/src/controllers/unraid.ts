/* eslint-disable import/prefer-default-export */
import { RequestHandler } from 'express'
import Puppeteer, { Page } from 'puppeteer'

const UNRAID_BASE_URL = process.env.UNRAID_URL
const { UNRAID_USER, UNRAID_PASSWORD } = process.env

// CPU Temp ✅
// CPU Load
// GPU Temp
// GPU Load
// Memory Usage and total capacity
// Uptime
// UPS Stats
// Array Usage
// Cache Usage
// Individual drive temps

const getPage = async (url: string): Promise<Page> => {
  const browser = await Puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  return page
}

const getText = async (page: Page, selector: string, notEmpty?: boolean): Promise<string> => {
  if (notEmpty) {
    await page.waitForSelector(`${selector}:not(:empty)`)
  }
  const text = await page.$eval(selector, (el) => el.textContent)
  return text.toString()
}

const loginToUnraid = async (): Promise<Page> => {
  if (!UNRAID_BASE_URL) throw new Error('Unraid url environment variable is not set')
  const page = await getPage(UNRAID_BASE_URL)
  await page.setViewport({ width: 1920, height: 1080 })
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

const getCpuTemp = async (page: Page): Promise<string> => getText(page, '#cpu-temp', true)

const getCpuLoad = async (page: Page): Promise<string> => getText(page, '#cpu-load', true)

const getGpuTemp = async (page: Page): Promise<string> => getText(page, '#gpu-temp', true)

const getGpuLoad = async (page: Page): Promise<string> => getText(page, '#gpu-load', true)

const getMemoryUsage = async (page: Page): Promise<string> => getText(page, '#memory-usage', true)

const getMemoryCapacity = async (page: Page): Promise<string> =>
  getText(page, '#memory-capacity', true)

const getUptime = async (page: Page): Promise<string> => getText(page, '#uptime', true)

const getUpsStatus = async (page: Page): Promise<string> => getText(page, '#ups-status', true)

const getArrayUsage = async (page: Page): Promise<string> => getText(page, '#array-usage', true)

const getCacheUsage = async (page: Page): Promise<string> => getText(page, '#cache-usage', true)

const getDriveTemps = async (page: Page): Promise<string> => getText(page, '#drive-temps', true)

export const getUnraidStats: RequestHandler = async (_req, res) => {
  const page = await loginToUnraid()
  await page.goto(`${UNRAID_BASE_URL}Dashboard`)

  res.send(await getCpuTemp(page))
}
