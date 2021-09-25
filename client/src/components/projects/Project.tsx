import { useState, Fragment, FC, ReactNode } from 'react'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  ButtonGroup,
  Button,
  Typography,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Theme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Fade from 'react-reveal/Fade'

import ProjectButton from 'components/projects/ProjectButton'
import TechChip from 'components/projects/TechChip'
import { Project as ProjectType } from 'ts/app/types'

interface Props {
  project: ProjectType
  isOdd: boolean
}

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
    [theme.breakpoints.down('md')]: {
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

const Project: FC<Props> = ({ project, isOdd }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const cardImage = {
    backgroundImage: `url(${project.image}), url(${project.background})`,
    backgroundColor: project.background,
  }

  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded)
  }

  const expandMoreButton = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm')) ? (
    <Button
      variant="outlined"
      color="inherit"
      onClick={handleExpand}
      aria-expanded={expanded}
      aria-label="show more"
      endIcon={
        <ExpandMoreIcon
          className={[classes.expand, expanded ? classes.expandOpen : ''].join(' ')}
        />
      }
    >
      {'More Details '}
    </Button>
  ) : (
    <IconButton onClick={handleExpand} aria-expanded={expanded} aria-label="show more" size="large">
      <ExpandMoreIcon className={[classes.expand, expanded ? classes.expandOpen : ''].join(' ')} />
    </IconButton>
  )

  const buttons = project.buttons.map((button) => (
    <ProjectButton key={button.name} button={button} />
  ))

  const buttonGroup = (
    <div className={classes.buttons}>
      <ButtonGroup variant="outlined" color="inherit">
        {buttons}
      </ButtonGroup>
      {expandMoreButton}
    </div>
  )

  const chips = project.stack.map((tech) => <TechChip key={tech.name} tech={tech} />)

  const description = project.description.map((section) => {
    const sectionContent = (
      <List>
        {section.content.map((listItem: string | ReactNode, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={i}>
            <ListItemText>{listItem}</ListItemText>
          </ListItem>
        ))}
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
        <div>{chips}</div>
        {buttonGroup}
      </CardActions>
    </>
  )

  const mobileCard = (
    <Card raised className={[classes.root, classes.mobile].join(' ')}>
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
    <Card
      raised
      className={[classes.root, classes.desktop, isOdd ? classes.flipped : ''].join(' ')}
    >
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

  if (project.hidden) return null

  return (
    <Fade left={!isOdd} right={isOdd}>
      {mobileCard}
      {desktopCard}
    </Fade>
  )
}

export default Project
