import React from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-auth'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Facebook, Apple, GitHub, Twitter } from '@material-ui/icons'
import GoogleIcon from 'components/Icons/GoogleIcon'

const useStyles = makeStyles((theme) => ({
  loginButtons: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',
    textAlign: 'center',
    '& button': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '250px',
    },
  },
  title: {
    marginBottom: 50,
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const Login: React.FC = () => {
  const classes = useStyles()

  const responseFacebook = (response: any): void => {
    console.log(response)
  }

  const isGoogleLoginResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline): response is GoogleLoginResponse => (
    !!response && typeof response === 'object' && !!(response as GoogleLoginResponse).tokenObj
  )

  const responseSuccessGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    console.log(response)
    if (!isGoogleLoginResponse(response)) return
    console.log(response.tokenId)
    axios.post('/google-login', {
      idToken: response.tokenId,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const responseErrorGoogle = (response: any): void => {
    console.log(response)
  }

  return (
    <div className={classes.loginButtons}>
      <Typography className={classes.title} variant="h3">Login</Typography>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        callback={responseFacebook}
        component={(renderProps: any) => (
          <Button
            onClick={renderProps.onClick}
            variant="outlined"
            startIcon={<Facebook />}
            className={classes.button}
          >
            Login with Facebook
          </Button>
        )}
      />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_APP_ID as string}
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="outlined"
            startIcon={<GoogleIcon />}
            className={classes.button}
          >
            Login with Google
          </Button>
        )}
      />
      <Button
        onClick={() => {}}
        variant="outlined"
        startIcon={<Twitter />}
        className={classes.button}
      >
        Login with Twitter
      </Button>
      <Button
        onClick={() => {}}
        variant="outlined"
        startIcon={<Apple />}
        className={classes.button}
      >
        Login with Apple
      </Button>
      <Button
        onClick={() => {}}
        variant="outlined"
        startIcon={<GitHub />}
        className={classes.button}
      >
        Login with GitHub
      </Button>
    </div>
  )
}

export default Login
