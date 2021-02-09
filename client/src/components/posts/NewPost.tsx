import React, { useState } from 'react'
import { Card } from '@material-ui/core'

const NewPost: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)

  return (
    <Card>
      New Post
    </Card>
  )
}

export default NewPost
