/* eslint-disable no-console */
import { FC, useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import FacebookLogin from 'react-facebook-auth'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { Button, makeStyles, Typography, Container } from '@material-ui/core'
import { Facebook, Apple, GitHub, Twitter } from '@material-ui/icons'
import GoogleIcon from 'components/icons/GoogleIcon'
import WaitFor from 'components/utility/WaitFor'
import InfoMessage from 'components/ui/InfoMessage'
import { AuthContext } from 'context/Auth'
import { useHistory } from 'react-router-dom'
import useApi from 'hooks/useApi'

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
  const { user, setUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const api = useApi()
  const history = useHistory()

  useEffect(() => {
    if (user) history.push('/')
  }, [user, history])

  const responseFacebook = (response: any): void => {
    console.log(response)
  }

  const isGoogleLoginResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ): response is GoogleLoginResponse =>
    !!response && typeof response === 'object' && !!(response as GoogleLoginResponse).tokenObj

  const responseSuccessGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ): void => {
    // console.log(response)
    if (!isGoogleLoginResponse(response)) return
    const token = response.tokenId
    setIsLoading(true)
    api
      .post('/google-login', {
        idToken: response.tokenId,
      })
      .then((res: AxiosResponse<any>) => {
        // console.log(res)
        setUser({
          profile: res.data.user,
          token,
        })
      })
      .catch((err: any) => {
        setHasError(true)
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  const responseErrorGoogle = (response: any): void => {
    console.log('Google sign in unsuccessful', response)
    setHasError(true)
  }

  const getLoginButton = (
    onClick: () => void,
    disabled: boolean | undefined,
    icon: JSX.Element,
    text: String,
  ) => (
    <Button onClick={onClick} disabled={disabled} variant="outlined" startIcon={icon}>
      {text}
    </Button>
  )

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
          {hasError && (
            <Typography color="error">
              Something went wrong, Sign In with Google is pending approval and is not available at
              this time.
            </Typography>
          )}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_APP_ID as string}
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy="single_host_origin"
            render={(renderProps) =>
              getLoginButton(
                renderProps.onClick,
                renderProps.disabled,
                <GoogleIcon />,
                'Sign In with Google',
              )
            }
          />
          {getLoginButton(() => {}, true, <Apple />, 'Coming soon, maybe...')}
          {getLoginButton(() => {}, true, <GitHub />, 'Coming soon, maybe...')}
          {getLoginButton(() => {}, true, <Twitter />, 'Coming soon, maybe...')}
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            callback={responseFacebook}
            component={(renderProps: any) =>
              getLoginButton(renderProps.onClick, true, <Facebook />, 'Coming soon, maybe...')
            }
          />
        </WaitFor>
      </Container>
    </>
  )
}

export default Login
