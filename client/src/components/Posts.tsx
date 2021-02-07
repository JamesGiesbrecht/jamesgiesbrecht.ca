import React, { useContext } from 'react'
import { Container, Typography } from '@material-ui/core'
import { AuthContext } from 'context/Auth'

const Posts: React.FC = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container>
      <Typography variant="h3">Posts</Typography>
    </Container>
  )
}

export default Posts
