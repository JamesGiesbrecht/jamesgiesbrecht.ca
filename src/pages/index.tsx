import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { NextPage } from 'next'

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
  console.log('Test Deploy')
  return (
    <div className={classes.sections}>
      <About />
      <Projects />
    </div>
  )
}

export default Home
