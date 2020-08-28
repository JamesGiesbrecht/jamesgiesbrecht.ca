import React from 'react'
import { Card, CardHeader, CardMedia, CardContent, CardActions, ButtonGroup, Button, makeStyles, Typography, Collapse, IconButton } from '@material-ui/core'
import { Link as LinkIcon, Code as CodeIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import Fade from 'react-reveal/Fade'
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
  mediaWrapper: {
    padding: 0,
    width: 175,
    minWidth: 175,
    minHeight: 300,
    height: 'auto',
    overflow: 'hidden',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    [theme.breakpoints.up('md')]: {
      transform: 'scale(1)',
      width: '100%',
      height: '100%',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
  },
  zoom: {
    transform: 'scale(1.5)',
  },
  link: {
    marginRight: theme.spacing(1),
  },
  content: {
    position: 'relative', //  For expand arrow to position in body
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  body: {
    flexGrow: 1,
  },
  flipped: {
    flexDirection: 'row-reverse',
    marginLeft: 'auto',
    marginRight: 0,
  },
  flippedContent: {
    marginRight: 'auto',
  },
  actions: {
    flexDirection: 'column',
    '& > *': {
      marginTop: theme.spacing(1),
      marginRight: 'auto',
    },
  },
  expand: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

const Project = ({ project, isOdd }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded)
  }

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

  const content = (
    <>
      <CardContent className={classes.body}>
        <Typography paragraph>{project.summary}</Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {project.description}
        </Collapse>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <div>
          {chips}
        </div>
        <div>
          {buttons}
          <IconButton
            className={[classes.expand, expanded ? classes.expandOpen : ''].join(' ')}
            onClick={handleExpand}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardActions>
    </>
  )

  const mobileCard = (
    <Card className={[classes.root, classes.mobile].join(' ')}>
      <CardHeader title={project.name} />
      <CardMedia
        className={classes.media}
        image={project.image}
        title={project.name}
      />
      {content}
    </Card>
  )

  const desktopCard = (
    <Card className={[classes.root, classes.desktop, isOdd ? classes.flipped : ''].join(' ')}>
      <div className={classes.mediaWrapper}>
        <CardMedia
          className={[classes.media, !expanded ? classes.zoom : ''].join(' ')}
          image={project.image}
          title={project.name}
        />
      </div>
      <div className={[classes.content, isOdd ? classes.flippedContent : ''].join(' ')}>
        <CardHeader title={project.name} />
        {content}
      </div>
    </Card>
  )

  return (
    <Fade left={!isOdd} right={isOdd}>
      {mobileCard}
      {desktopCard}
    </Fade>
  )
}

export default Project
