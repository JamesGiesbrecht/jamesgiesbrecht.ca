import { FC } from 'react'
import About from 'components/About'
import Projects from 'components/projects/Projects'
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  sections: {
    '& > *': {
      marginTop: theme.spacing(13),
    },
  },
}))

const Home: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.sections}>
      <About />
      <Projects />
    </div>
  )
}

export default Home
