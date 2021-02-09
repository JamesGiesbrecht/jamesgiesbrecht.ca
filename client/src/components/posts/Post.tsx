import React from 'react'
import { Card, Typography } from '@material-ui/core'

interface Props {
  title: string,
  content: string,
}

const Post: React.FC<Props> = ({ title, content }) => (
  <Card>
    <Typography variant="h5">{title}</Typography>
    <Typography>{content}</Typography>
  </Card>
)

export default Post
