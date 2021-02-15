import React from 'react'
import { ReactComponent as Google } from 'assets/img/logos/google.svg'
import { SvgIcon } from '@material-ui/core'

const GoogleIcon = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SvgIcon {...props}>
    <Google />
  </SvgIcon>
)
export default GoogleIcon
