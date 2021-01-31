import React from 'react'
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

const Login: React.FC = () => {
  const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): void => {
    console.log(response);
  }

  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    console.log(response);
  }

  return (
    <>
      <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
      <FacebookLogin
        appId="" // APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <br />
      <br />
      <GoogleLogin
        clientId="" // CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </>
  )
}

export default Login
