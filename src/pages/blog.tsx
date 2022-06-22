import { FC } from 'react'
import { Container, Typography, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({}))

const Blog: FC = () => {
  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Blog
      </Typography>
    </Container>
  )
}

export default Blog
