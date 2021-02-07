import React, { useContext, useEffect } from 'react'
import { Container, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { AuthContext } from 'context/Auth'

const Account: React.FC = () => {
  const { user } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (!user) history.push('/login')
  }, [user])

  return (
    <Container>
      <Typography variant="h3">My Account</Typography>
    </Container>
  )
}

export default Account
