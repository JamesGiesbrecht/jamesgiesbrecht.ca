import { FC, useContext, useEffect } from 'react'
import { Container, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { AuthContext } from 'context/Auth'

const Account: FC = () => {
  const { user } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (!user) history.push('/login')
  }, [user, history])

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        My Account
      </Typography>
      <Typography>{`Welcome to the account page ${user.profile.name}.`}</Typography>
      <Typography>More features coming soon...</Typography>
    </Container>
  )
}

export default Account
