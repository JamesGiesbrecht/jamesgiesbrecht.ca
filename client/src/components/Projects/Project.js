import React from 'react'
import { Card, CardHeader, CardMedia, CardContent, CardActions, ButtonGroup, Button, makeStyles, Typography } from '@material-ui/core'
import { Link as LinkIcon, Code as CodeIcon } from '@material-ui/icons'
import TechChip from './TechChip'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: theme.spacing(3, 'auto'),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'white',
  },
  link: {
    marginRight: theme.spacing(1),
  },
}))

const Project = ({ project }) => {
  const classes = useStyles()

  const getButton = (link, type) => {
    let icon
    switch (type) {
      case 'Code':
        icon = <CodeIcon className={classes.link} />
        break
      case 'Website':
      default:
        icon = <LinkIcon className={classes.link} />
    }

    if (link) {
      return (
        <Button
          href={link}
        >
          {icon}
          {type}
        </Button>
      )
    }
    return null
  }

  const buttons = (project.link || project.github)
    ? (
      <ButtonGroup>
        {getButton(project.link, 'Website')}
        {getButton(project.github, 'Code')}
      </ButtonGroup>
    )
    : null

  const chips = project.stack.map((tech) => <TechChip tech={tech} />)

  return (
    <Card className={classes.root}>
      <CardHeader
        title={project.name}
        subheader={project.summary}
      />
      <CardMedia
        className={classes.media}
        image={project.image}
        title={project.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{project.description}</Typography>
        {chips}
      </CardContent>
      <CardActions>
        {buttons}
      </CardActions>
    </Card>
  )
}

export default Project
