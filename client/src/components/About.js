import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import james from '../assets/img/james.jpg'

const useStyles = makeStyles((theme) => ({
  intro: {
    marginTop: '60px',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  name: {
    color: theme.palette.secondary.main,
  },
  picture: {
    borderRadius: '50%',
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
      <img className={classes.picture} src={james} alt="James Giesbrecht" />
      <Typography variant="h3" align="center">
        {'Hi, I\'m '}
        <span className={classes.name}>James Giesbrecht</span>
        .
      </Typography>
    </div>
  )
}

export default About
