const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/plex-sessions', (req, res) => {
  axios.get(
    `${process.env.PLEX_SERVER_URL}/status/sessions?X-Plex-Token=${process.env.PLEX_TOKEN}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((result) => {
      let wanStreams = 0
      let lanStreams = 0
      let expectedQuality
      let message
      result.data.MediaContainer.Metadata.forEach((stream) => {
        if (stream.Session.location === 'wan') {
          wanStreams += 1
        } else if (stream.Session.location === 'lan') {
          lanStreams += 1
        }
      })

      switch (wanStreams) {
        case 0:
          if (lanStreams === 0) {
            message = 'Woohoo! There is nobody using Plex right now! You should be able to stream in crisp HD quality (720p - 1080p).'
          } else {
            message = 'Woohoo! There are no external users using Plex right now! You should be able to stream in crisp HD quality (720p - 1080p).'
          }
          expectedQuality = '720p -1080p'
          break
        case 1:
          message = 'There is 1 external user using Plex right now. A second stream should be able to stream at 480p (DVD quality).'
          expectedQuality = '480p'
          break
        case 2:
          message = 'There are 2 external users using Plex right now. A third stream will be throttled to about 240p (Potato quality).'
          expectedQuality = '240p'
          break
        case 3:
          message = 'There are a whopping 3 external users using Plex right now, good luck...'
          expectedQuality = '144p'
          break
        case 4:
          message = 'There are a lot of people trying to use Plex, try again later...'
          expectedQuality = 'GameBoy'
          break
        default:
          message = 'Something went wrong'
      }

      res.json({
        externalStreams: wanStreams,
        internalStreams: lanStreams,
        expectedQuality,
        message,
      })
    })
    .catch((error) => {
      console.log('Error accessing Plex API', error)
      res.json({ message: error.message })
    })
})

module.exports = router
