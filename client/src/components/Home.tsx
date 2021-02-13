import React from 'react'
import About from 'components/About'
import Projects from 'components/projects/Projects'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  sections: {
    '& > *': {
      marginTop: theme.spacing(13),
    },
  },
}))

const Home: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.sections}>
      <About />
      <Projects />
    </div>
  )
}

export default Home
