import { FC, ReactNode, useContext, useState } from 'react'
// import { Apple, GitHub, Twitter } from '@mui/icons-material'
import { Button, Typography, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'

import { AuthContext } from 'context/Auth'
import GoogleIcon from 'components/icons/GoogleIcon'
import InfoMessage from 'components/ui/InfoMessage'
import WaitFor from 'components/utility/WaitFor'

const useStyles = makeStyles((theme) => ({
  loginButtons: {
    textAlign: 'center',
    '& button': {
      minWidth: 230,
      margin: theme.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },
  title: {
    marginBottom: 50,
  },
}))

const Login: FC = () => {
  const classes = useStyles()
  const { user, signInWithGoogle } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const history = useHistory()

  if (user) {
    history.push('/')
    return null
  }

  const getLoginButton = (onClick: () => void, icon: ReactNode, text: string) => (
    <Button onClick={onClick} variant="outlined" color="inherit" startIcon={icon}>
      {text}
    </Button>
  )

  const handleSignInWithGoogle = async () => {
    setIsLoading(true)
    await signInWithGoogle()
    setIsLoading(false)
  }

  return (
    <>
      <InfoMessage title="What is this Page About?" id="loginAbout">
        <Typography>
          This app utilizes Firebase authentication to create accounts so they can create posts in
          the "Posts" tab.
        </Typography>
      </InfoMessage>
      <Container className={classes.loginButtons}>
        <Typography className={classes.title} variant="h3">
          Sign In
        </Typography>
        <WaitFor isLoading={isLoading}>
          {getLoginButton(handleSignInWithGoogle, <GoogleIcon />, 'Sign In with Google')}
          {/* When adding providers update privacy policy */}
          {/* {getLoginButton(() => {}, <Apple />, 'Coming soon, maybe...')}
          {getLoginButton(() => {}, <GitHub />, 'Coming soon, maybe...')}
          {getLoginButton(() => {}, <Twitter />, 'Coming soon, maybe...')} */}
        </WaitFor>
      </Container>
    </>
  )
}

export default Login
