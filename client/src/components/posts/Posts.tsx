import React, { useContext, useEffect, useState } from 'react'
import API from 'util/api'
import { Container, Typography } from '@material-ui/core'
import { AuthContext } from 'context/Auth'
import Post from 'components/posts/Post'
import NewPost from 'components/posts/NewPost'

const Posts: React.FC = () => {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState<any>([])

  useEffect(() => {
    API.get('/api/posts')
      .then((result) => {
        console.log(result)
        setPosts(result.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Container>
      <Typography variant="h3">Posts</Typography>
      <NewPost />
      {posts.map((post: any) => <Post title={post.title} content={post.content} />)}
    </Container>
  )
}

export default Posts
