import React from 'react'
import { Card, CardHeader, CardMedia, CardContent, CardActions, ButtonGroup, Button } from '@material-ui/core'

const Project = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        {project.name}
      </CardHeader>
      <CardMedia
        image={project.image}
      />
      <CardContent>
        {project.description}
      </CardContent>
      <CardActions>
        <ButtonGroup>
          <Button>View Website</Button>
          <Button>View Code</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  )
}

export default Project
