import React from 'react'
import { Card, CardHeader, CardMedia, CardContent, CardActions, ButtonGroup, Button, makeStyles, Typography } from '@material-ui/core'
import { Link as LinkIcon, Code as CodeIcon } from '@material-ui/icons'
import TechChip from './TechChip'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(3, 'auto'),
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: 850,
      flexDirection: 'row',
      marginLeft: 0,
    },
  },
  flipped: {
    flexDirection: 'row-reverse',
    marginLeft: 'auto',
    marginRight: 0,
  },
  flippedContent: {
    marginRight: 'auto',
  },
  mobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  desktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    [theme.breakpoints.up('md')]: {
      padding: 0,
      width: 175,
      height: 300,
    },
  },
  link: {
    marginRight: theme.spacing(1),
  },
  actions: {
    flexDirection: 'column',
    '& > *': {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      bottom: 0,
    },
  },
  buttons: {
    marginRight: 'auto',
  },
}))

const Project = ({ project, isOdd }) => {
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

  const mobileCard = (
    <Card className={[classes.root, classes.mobile].join(' ')}>
      <CardHeader
        title={project.name}
        subheader={project.summary}
      />
      <div>
        <CardMedia
          className={classes.media}
          image={project.image}
          title={project.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{project.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <div>
            {chips}
          </div>
          <div>
            {buttons}
          </div>
        </CardActions>
      </div>
    </Card>
  )

  const desktopCard = (
    <Card className={[classes.root, classes.desktop, isOdd ? classes.flipped : ''].join(' ')}>
      <CardMedia
        className={classes.media}
        image={project.image}
        title={project.name}
      />
      <div className={isOdd ? classes.flippedContent : ''}>
        <CardHeader
          title={project.name}
          subheader={project.summary}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{project.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <div>
            {chips}
          </div>
          <div className={classes.buttons}>
            {buttons}
          </div>
        </CardActions>
      </div>
    </Card>
  )

  return (
    <>
      {mobileCard}
      {desktopCard}
    </>
  )
}

export default Project
