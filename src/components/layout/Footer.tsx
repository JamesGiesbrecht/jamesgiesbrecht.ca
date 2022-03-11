import { FC } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GitHub, Instagram, Mail, LinkedIn, Twitter } from '@mui/icons-material'
import { IconButton, Button, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import RouterLink from 'next/link'

import routes from 'consts/routes'

const useStyles = makeStyles((theme: Theme) => ({
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

const Footer: FC = () => {
  const classes = useStyles()

  const resetPrompts = () => localStorage.removeItem('hiddenMessages')

  const icons = socialMedia.map((social) => (
    <IconButton key={social.name} href={social.link} target="_blank" size="large">
      {social.icon}
    </IconButton>
  ))

  return (
    <footer className={classes.footer}>
      {icons}
      <RouterLink href={routes.privacy.path} passHref>
        <Button size="small" color="inherit">
          Privacy
        </Button>
      </RouterLink>
      <Button size="small" color="inherit" onClick={resetPrompts}>
        Reset Prompts
      </Button>
    </footer>
  )
}

export default Footer
