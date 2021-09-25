import { FC } from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

import { ReactComponent as Google } from 'assets/img/logos/google.svg'

const GoogleIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <Google />
  </SvgIcon>
)
export default GoogleIcon
