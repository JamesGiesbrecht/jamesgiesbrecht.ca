import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import projectData from 'consts/projects'
import Project from 'components/projects/Project'

const useStyles = makeStyles((theme) => ({
  projects: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 900,
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: 500,
    },
  },
}))

const Projects = () => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h3">Projects</Typography>
      <div className={classes.projects}>
        {projectData.map((proj, i) => (
          <Project key={proj.name} project={proj} isOdd={i % 2 === 1} />
        ))}
      </div>
    </>
  )
}

export default Projects
