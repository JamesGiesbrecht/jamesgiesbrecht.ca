import { ReactComponent as Google } from 'assets/img/logos/google.svg'
import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'

const GoogleIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <Google />
  </SvgIcon>
)
export default GoogleIcon
