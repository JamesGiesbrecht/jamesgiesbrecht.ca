import { FC } from 'react'
import { IconButton, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link as RouterLink } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GitHub, Instagram, Mail, LinkedIn, Twitter } from '@mui/icons-material'

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
