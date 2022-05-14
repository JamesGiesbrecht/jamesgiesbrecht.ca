/* eslint-disable import/prefer-default-export */
import { RequestHandler } from 'express'
import Puppeteer, { Page } from 'puppeteer'

const UNRAID_BASE_URL = process.env.UNRAID_URL
const { UNRAID_USER, UNRAID_PASSWORD } = process.env
console.log(UNRAID_BASE_URL, UNRAID_USER, UNRAID_PASSWORD)

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

export const getUnraidStats: RequestHandler = async (_req, res) => {
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
  await page.goto(`${UNRAID_BASE_URL}Dashboard`)
  // res.send(await page.content())
  res.send(await getText(page, '#cpu-temp', true))
}
