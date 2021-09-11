/* eslint-disable no-console */
import { FC, useContext, useState } from 'react'
import { Button, makeStyles, Typography, Container } from '@material-ui/core'
import { Apple, GitHub, Twitter } from '@material-ui/icons'
import GoogleIcon from 'components/icons/GoogleIcon'
import WaitFor from 'components/utility/WaitFor'
import InfoMessage from 'components/ui/InfoMessage'
import { AuthContext } from 'context/Auth'
import { useHistory } from 'react-router-dom'

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

  const getLoginButton = (onClick: () => void, icon: JSX.Element, text: String) => (
    <Button onClick={onClick} variant="outlined" startIcon={icon}>
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
        <Typography paragraph>
          ATTENTION: The app is currently pending approval from Google, sign in functionality is not
          available at this moment. If you would like to be added to the test group in order to sign
          in, please contact me.
        </Typography>
        <Typography>
          This app utilizes OAuth and JWT to create accounts with the MongoDB, Express, Node, and
          React (MERN) stack. Authenticated users will be able to make, edit, and delete posts on
          the posts page.
        </Typography>
        <Typography>
          Minimum permissions are used when requesting account information with identity providers
          and it is never sold or given away.
        </Typography>
      </InfoMessage>
      <Container className={classes.loginButtons}>
        <Typography className={classes.title} variant="h3">
          Sign In
        </Typography>
        <WaitFor isLoading={isLoading}>
          {getLoginButton(handleSignInWithGoogle, <GoogleIcon />, 'Sign In with Google')}
          {getLoginButton(() => {}, <Apple />, 'Coming soon, maybe...')}
          {getLoginButton(() => {}, <GitHub />, 'Coming soon, maybe...')}
          {getLoginButton(() => {}, <Twitter />, 'Coming soon, maybe...')}
        </WaitFor>
      </Container>
    </>
  )
}

export default Login
