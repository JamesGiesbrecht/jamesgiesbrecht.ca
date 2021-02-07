const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/sessions', (req, res) => {
  axios.get(
    `${process.env.PLEX_SERVER_URL}/status/sessions?X-Plex-Token=${process.env.PLEX_TOKEN}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((result) => {
      let reqIsWatching = false
      let wanStreams = 0
      let lanStreams = 0
      let expectedQuality
      let message
      if (result.data.MediaContainer && result.data.MediaContainer.Metadata) {
        result.data.MediaContainer.Metadata.forEach((stream) => {
          if (stream.Player.remotePublicAddress === req.ip) reqIsWatching = true
          if (stream.Session.location === 'lan') {
            lanStreams += 1
          } else {
            wanStreams += 1
          }
        })
      }

      switch (wanStreams) {
        case 0:
          if (lanStreams === 0) {
            message = 'Woohoo! There is nobody using Plex right now! You should be able to stream in crisp HD quality (720p - 1080p).'
          } else {
            message = 'Woohoo! There are no external users using Plex right now! You should be able to stream in HD quality (720p - 1080p).'
          }
          expectedQuality = '720p -1080p'
          break
        case 1:
          if (reqIsWatching) {
            message = 'You are the only one watching Plex right now, enjoy the HD quality, hopefully.'
            expectedQuality = '720p -1080p'
          } else {
            message = 'There is 1 external user using Plex right now. A second stream should be able to stream at 480p (DVD quality).'
            expectedQuality = '480p'
          }
          break
        case 2:
          if (reqIsWatching) {
            message = 'There is one other person watching Plex right now, you should be able to stream at 480p (DVD quality).'
            expectedQuality = '480p'
          } else {
            message = 'There are 2 external users using Plex right now. A third stream will be throttled to about 240p (Potato quality).'
            expectedQuality = '240p'
          }
          break
        case 3:
          if (reqIsWatching) {
            message = 'There are 2 other people also watching Plex right now, your experience may suffer.'
            expectedQuality = '240p'
          } else {
            message = 'There are a whopping 3 external users using Plex right now, good luck...'
            expectedQuality = '144p'
          }
          break
        case 4:
          if (reqIsWatching) {
            message = 'There are 3 other people trying to stream Plex right now, maybe try again later'
            expectedQuality = '144p'
          } else {
            message = 'There are a lot of people trying to use Plex, try again later...'
          }
          break
        default:
          message = 'Something went wrong'
      }

      res.json({
        streams: {
          external: wanStreams,
          internal: lanStreams,
        },
        quality: expectedQuality,
        isWatching: reqIsWatching,
        message,
      })
    })
    .catch((error) => {
      console.log('Error accessing Plex API', error)
      res.json({ message: 'Uh-oh, something went wrong, try again later', error })
    })
})

module.exports = router
