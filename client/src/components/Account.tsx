import { FC, useContext } from 'react'
import { Container, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'

import { AuthContext } from 'context/Auth'

const Account: FC = () => {
  const { user } = useContext(AuthContext)
  const history = useHistory()

  if (!user) {
    history.push('/login')
    return null
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        My Account
      </Typography>
      <Typography>{`Welcome to the account page ${user.displayName || user.email}.`}</Typography>
      <Typography>More features coming soon, maybe...</Typography>
    </Container>
  )
}

export default Account
