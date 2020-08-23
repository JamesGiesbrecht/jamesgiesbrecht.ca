import React from 'react'
import { makeStyles, Link, Container } from '@material-ui/core'
// eslint-disable-next-line no-unused-vars
import { GitHub, Instagram, Mail, LinkedIn, Twitter } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    paddingTop: theme.spacing(8),
    textAlign: 'center',
  },
  icon: {
    '& :hover': {
      color: theme.palette.action.hover,
    },
    '& +a': {
      marginLeft: theme.spacing(4),
    },
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

const Footer = () => {
  const classes = useStyles()

  const icons = socialMedia.map((social) => (
    <Link
      key={social.name}
      className={classes.icon}
      href={social.link}
      color="inherit"
    >
      {social.icon}
    </Link>
  ))

  return (
    <footer className={classes.footer}>
      {icons}
    </footer>
  )
}

export default Footer
