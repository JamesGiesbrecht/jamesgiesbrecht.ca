const axios = require('axios')
const cheerio = require('cheerio')

exports.scrapeSite = async (siteUrl) => {
  const result = await axios.get(siteUrl)
  return cheerio.load(result.data)
}
