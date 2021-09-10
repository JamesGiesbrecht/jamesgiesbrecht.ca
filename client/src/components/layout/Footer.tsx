import React from 'react'
import { makeStyles, IconButton, Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { GitHub, Instagram, Mail, LinkedIn, Twitter } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    paddingTop: theme.spacing(8),
    textAlign: 'center',
  },
}))

const socialMedia = [
  {
    name: 'Email',
    link: 'mailto:giesbrechtjames@gmail.com',
    icon: <Mail />,
  },
  {
    name: 'Github',
    link: 'https://github.com/JamesGiesbrecht',
    icon: <GitHub />,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/jamesgiesbrecht',
    icon: <LinkedIn />,
  },
  // {
  //   name: 'Twitter',
  //   link: 'https://twitter.com/JamesGiesbrecht',
  //   icon: <Twitter />,
  // },
  // {
  //   name: 'Instagram',
  //   link: 'https://www.instagram.com/jamesgiesbrecht/',
  //   icon: <Instagram />,
  // },
]

const Footer: React.FC = () => {
  const classes = useStyles()

  const resetPrompts = () => localStorage.removeItem('hiddenMessages')

  const icons = socialMedia.map((social) => (
    <IconButton key={social.name} href={social.link} target="_blank">
      {social.icon}
    </IconButton>
  ))

  return (
    <footer className={classes.footer}>
      {icons}
      <Button size="small" component={RouterLink} to="/privacy">
        Privacy
      </Button>
      <Button size="small" onClick={resetPrompts}>
        Reset Prompts
      </Button>
    </footer>
  )
}

export default Footer
