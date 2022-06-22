import Image from 'next/image'
import { Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import jamesPic from '../../../public/img/james.jpg'

const useStyles = makeStyles((theme: Theme) => ({
  intro: {
    marginTop: '60px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  name: {
    color: theme.palette.secondary.main,
  },
  picture: {
    borderRadius: '50%',
  },
  pictureWrapper: {
    position: 'relative',
    width: '90vw',
    height: '90vw',
    padding: '30px',
    [theme.breakpoints.up('sm')]: {
      width: '275px',
      height: 'auto',
      marginRight: '50px',
      padding: '0',
    },
  },
}))

const About = () => {
  const classes = useStyles()
  return (
    <div className={classes.intro}>
      <div className={classes.pictureWrapper}>
        <Image
          className={classes.picture}
          src={jamesPic}
          alt="James Giesbrecht"
          layout="responsive"
        />
      </div>
      <Typography variant="h3" align="center">
        {"Hi, I'm "}
        <span className={classes.name}>Testing Next.js autodeploy 3</span>.
      </Typography>
    </div>
  )
}

export default About
