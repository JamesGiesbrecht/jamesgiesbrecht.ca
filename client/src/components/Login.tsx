import React from 'react'
import axios from 'axios'
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

const Login: React.FC = () => {
  const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): void => {
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
    <>
      <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID as string}
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <br />
      <br />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_APP_ID as string}
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
      />
    </>
  )
}

export default Login
