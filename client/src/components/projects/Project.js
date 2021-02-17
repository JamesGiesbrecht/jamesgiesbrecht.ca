import React, { useState, Fragment } from 'react'
import { Card, CardHeader, CardMedia, CardContent, CardActions, ButtonGroup, Button, makeStyles, Typography, Collapse, IconButton, Popper, Paper, List, ListItem, ListItemText, useMediaQuery } from '@material-ui/core'
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
    height: '280px',
    padding: '15%',
    backgroundSize: 'contain, cover',
    backgroundOrigin: 'content-box, padding-box',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  zoom: {
    transform: 'scale(1.5)',
  },
  linkIcon: {
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
    marginLeft: theme.spacing(1),
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  popper: {
    padding: theme.spacing(2),
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const Project = ({ project, isOdd }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [popperAnchor, setPopperAnchor] = useState(false)

  const cardImage = {
    backgroundImage: `url(${project.image}), url(${project.background})`,
    backgroundColor: project.background,
  }

  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded)
  }

  const handlePopperClick = (e) => {
    setPopperAnchor(popperAnchor ? null : e.currentTarget)
  }

  const popperOpen = Boolean(popperAnchor)

  const getButton = (link, type) => {
    let icon
    switch (type) {
      case 'Code':
        icon = <CodeIcon className={classes.linkIcon} />
        break
      case 'Website':
      default:
        icon = <LinkIcon className={classes.linkIcon} />
    }

    if (link) {
      if (link.isPopper) {
        return (
          <Button
            onClick={handlePopperClick}
          >
            {icon}
            {type}
            <Popper
              open={popperOpen}
              anchorEl={popperAnchor}
            >
              <Paper className={classes.popper}>{link.content}</Paper>
            </Popper>
          </Button>
        )
      }
      return (
        <Button
          href={link}
          target="_blank"
        >
          {icon}
          {type}
        </Button>
      )
    }
    return null
  }

  const expandMoreButton = useMediaQuery((theme) => theme.breakpoints.up('sm')) ? (
    <Button
      variant="outlined"
      onClick={handleExpand}
      aria-expanded={expanded}
      aria-label="show more"
    >
      {'More Details '}
      <ExpandMoreIcon
        className={[classes.expand, expanded ? classes.expandOpen : ''].join(' ')}
      />
    </Button>
  ) : (
    <IconButton
      onClick={handleExpand}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon
        className={[classes.expand, expanded ? classes.expandOpen : ''].join(' ')}
      />
    </IconButton>
  )

  const buttons = (
    <div className={classes.buttons}>
      <ButtonGroup>
        {getButton(project.link, 'Website')}
        {getButton(project.github, 'Code')}
      </ButtonGroup>
      {expandMoreButton}
    </div>
  )

  const chips = project.stack.map((tech) => <TechChip key={tech.name} tech={tech} />)

  const description = project.description.map((section) => {
    const sectionContent = (
      <List>
        {section.content.map((listItem) => {
          const key = typeof listItem === 'object' ? listItem.props.children[0] : listItem
          return <ListItem key={key}><ListItemText>{listItem}</ListItemText></ListItem>
        })}
      </List>
    )

    return (
      <Fragment key={section.title}>
        <Typography variant="h6">{section.title}</Typography>
        {sectionContent}
      </Fragment>
    )
  })

  const content = (
    <>
      <CardContent className={classes.body}>
        <Typography paragraph>{project.summary}</Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {description}
        </Collapse>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <div>
          {chips}
        </div>
        {buttons}
      </CardActions>
    </>
  )

  const mobileCard = (
    <Card className={[classes.root, classes.mobile].join(' ')}>
      <CardHeader title={project.name} />
      <CardMedia
        className={classes.media}
        style={cardImage}
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
          className={classes.media}
          style={cardImage}
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
