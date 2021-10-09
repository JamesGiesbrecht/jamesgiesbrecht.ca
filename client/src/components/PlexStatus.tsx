import { FC, useEffect, useState } from 'react'
import { ChevronRight, Theaters } from '@mui/icons-material'
import { Button, Container, Typography, Paper, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios, { AxiosResponse } from 'axios'

import WaitFor from 'components/utility/WaitFor'
import { GetPlexStatusResponse } from '../../../@types/james-giesbrecht'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  content: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  stats: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  statsItem: {
    textAlign: 'center',
    '& *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
}))

const PlexStatus: FC = () => {
  const classes = useStyles()
  const [plexStats, setPlexStats] = useState<GetPlexStatusResponse>()
  const [hasError, setHasError] = useState<Boolean>(false)

  useEffect(() => {
    axios
      .get('/api/plex/sessions')
      .then((result: AxiosResponse<GetPlexStatusResponse>) => {
        setPlexStats(result.data)
      })
      .catch(() => {
        setHasError(true)
      })
  }, [])

  let content

  if (hasError) {
    content = <Typography variant="h4">Something went wrong, try again later.</Typography>
  } else if (plexStats) {
    let status
    switch (plexStats.streams.external) {
      case 0:
        status = 'There is no one watching Plex right now.'
        break
      case 1:
        status = plexStats.isWatching
          ? 'You are the only user streaming on Plex right now.'
          : 'There is one user streaming Plex right now.'
        break
      case 2:
        status = plexStats.isWatching
          ? 'There is one other user streaming on Plex right now.'
          : 'There are two users streaming on Plex right now.'
        break
      case 3:
        status = plexStats.isWatching
          ? 'There are two other users streaming on Plex right now, expect a low quality stream.'
          : 'There are three users streaming on Plex right now, your stream may be unusable.'
        break
      default:
        status = 'The network is near saturation, streaming may be unavailable.'
    }

    content = (
      <>
        <Paper className={classes.stats}>
          <Grid container spacing={3}>
            <Grid item className={classes.statsItem} xs={12} md={6}>
              <Typography variant="h4">Active Streams</Typography>
              <Typography variant="h4">{plexStats.streams.external}</Typography>
            </Grid>
            {plexStats && (
              <Grid item className={classes.statsItem} xs={12} md={6}>
                <Typography variant="h4">Quality</Typography>
                <Typography variant="h4">{plexStats.quality}</Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
        <Typography variant="h5">{status}</Typography>
        <Button
          className={classes.button}
          variant="contained"
          href="https://app.plex.tv"
          startIcon={<ChevronRight fontSize="large" />}
        >
          Go to Plex
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          href="https://goose.fans"
          startIcon={<Theaters fontSize="large" />}
        >
          Request Movies/TV on Ombi
        </Button>
      </>
    )
  }

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Plex Status
      </Typography>
      <Container className={classes.content}>
        <WaitFor isLoading={!plexStats}>{content}</WaitFor>
      </Container>
    </>
  )
}

export default PlexStatus
