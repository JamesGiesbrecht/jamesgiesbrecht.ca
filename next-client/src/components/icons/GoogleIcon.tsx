import { FC } from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

import Google from '../../assets/google.svg'

const GoogleIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <Google />
  </SvgIcon>
)
export default GoogleIcon
