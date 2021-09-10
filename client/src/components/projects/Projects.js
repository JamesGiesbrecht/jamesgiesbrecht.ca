import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import projects from 'assets/projects'
import Project from './Project'

const useStyles = makeStyles((theme) => ({
  projects: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 900,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
    },
  },
}))

const Projects = () => {
  const classes = useStyles()

  const projs = projects.map((proj, i) => (
    <Project key={proj.name} project={proj} isOdd={i % 2 === 1} />
  ))

  return (
    <>
      <Typography variant="h3">Projects</Typography>
      <div className={classes.projects}>{projs}</div>
    </>
  )
}

export default Projects
