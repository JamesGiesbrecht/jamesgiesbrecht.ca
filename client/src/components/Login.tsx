import React, { useContext } from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-auth'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { Button, makeStyles, Typography, Container } from '@material-ui/core'
import { Facebook, Apple, GitHub, Twitter } from '@material-ui/icons'
import GoogleIcon from 'components/Icons/GoogleIcon'
import { AuthContext } from 'context/Auth'

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

const Login: React.FC = () => {
  const classes = useStyles()
  const { setUser } = useContext(AuthContext)

  const responseFacebook = (response: any): void => {
    console.log(response)
  }

  const isGoogleLoginResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline): response is GoogleLoginResponse => (
    !!response && typeof response === 'object' && !!(response as GoogleLoginResponse).tokenObj
  )

  const responseSuccessGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    console.log(response)
    if (!isGoogleLoginResponse(response)) return

    setUser({
      profile: response.profileObj,
      token: response.tokenId,
    })

    axios.post('/google-login', {
      idToken: response.tokenId,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const responseErrorGoogle = (response: any): void => {
    console.log('Google sign in unsuccessful', response)
  }

  return (
    <Container className={classes.loginButtons}>
      <Typography className={classes.title} variant="h3">Sign In</Typography>
      <Button
        onClick={() => {}}
        variant="outlined"
        startIcon={<Apple />}
      >
        Sign In with Apple
      </Button>
      <Button
        onClick={() => {}}
        variant="outlined"
        startIcon={<GitHub />}
      >
        Sign In with GitHub
      </Button>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_APP_ID as string}
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy="single_host_origin"
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="outlined"
            startIcon={<GoogleIcon />}
          >
            Sign In with Google
          </Button>
        )}
      />
      <Button
        onClick={() => {}}
        variant="outlined"
        startIcon={<Twitter />}
      >
        Sign In with Twitter
      </Button>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        callback={responseFacebook}
        component={(renderProps: any) => (
          <Button
            onClick={renderProps.onClick}
            variant="outlined"
            startIcon={<Facebook />}
          >
            Sign In with Facebook
          </Button>
        )}
      />
    </Container>
  )
}

export default Login
