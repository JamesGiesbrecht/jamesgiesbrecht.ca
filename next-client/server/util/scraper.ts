import axios from 'axios'
import cheerio from 'cheerio'

// eslint-disable-next-line import/prefer-default-export
export const scrapeSite = async (siteUrl: string) => {
  const result = await axios.get(siteUrl)
  return cheerio.load(result.data)
}
