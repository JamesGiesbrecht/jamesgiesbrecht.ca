import axios from 'axios'
import cheerio from 'cheerio'

export const scrapeSite = async (siteUrl: string) => {
  const result = await axios.get(siteUrl)
  return cheerio.load(result.data)
}
