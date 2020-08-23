import React from 'react'
import { Typography } from '@material-ui/core'
import projects from '../../assets/projects'
import Project from './Project'

const Projects = () => {
  const projs = projects.map((proj) => (
    <Project project={proj} />
  ))

  return (
    <div>
      <Typography variant="h3">Projects</Typography>
      {projs}
    </div>
  )
}

export default Projects
