import React, { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { Container, Grid, Typography } from '@material-ui/core'
import Post from 'components/posts/Post'
import NewPost from 'components/posts/NewPost'
import useApi from 'hooks/useApi'

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any>([])
  const api = useApi()

  useEffect(() => {
    api.get('/api/posts')
      .then((result: AxiosResponse<any>) => {
        console.log(result)
        setPosts(result.data)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <>
      <Typography variant="h3">Posts</Typography>
      <Container>
        {/* <NewPost /> */}
        <Grid container spacing={3}>
          {posts.map((post: any) => (
            <Grid item xs={12} md={6} lg={4}>
              <Post title={post.title} content={post.content} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Posts
