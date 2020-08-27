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
      minWidth: 175,
      minHeight: 300,
      height: 'auto',
    },
  },
  link: {
    marginRight: theme.spacing(1),
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
  },
  actions: {
    flexDirection: 'column',
    '& > *': {
      margin: 0,
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

  const mobileCard = (
    <Card className={[classes.root, classes.mobile].join(' ')}>
      <CardHeader title={project.name} />
      <div>
        <CardMedia
          className={classes.media}
          image={project.image}
          title={project.name}
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">{project.summary}</Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
          </Collapse>
        </CardContent>
        <CardActions className={classes.actions}>
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
      <div className={[classes.body, isOdd ? classes.flippedContent : ''].join(' ')}>
        <CardHeader title={project.name} />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">{project.summary}</Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
          </Collapse>
        </CardContent>
        <CardActions className={classes.actions} disableSpacing>
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
          <div>
            {chips}
          </div>
        </CardActions>
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
