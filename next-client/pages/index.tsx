import type { NextPage } from 'next'
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import About from 'components/sections/About'
import Projects from 'components/sections/projects/Projects'

const useStyles = makeStyles((theme: Theme) => ({
  sections: {
    '& > *': {
      marginTop: theme.spacing(13),
    },
  },
}))

const Home: NextPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.sections}>
      <About />
      <Projects />
    </div>
  )
}

export default Home
