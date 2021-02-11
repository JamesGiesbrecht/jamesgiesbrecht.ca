import React, { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import Post from 'components/posts/Post'
import NewPost from 'components/posts/NewPost'
import useApi from 'hooks/useApi'
import WaitFor from 'components/utility/WaitFor'

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
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h3">Posts</Typography>
        <NewPost setPosts={setPosts} />
      </Box>
      <Container>
        <WaitFor isLoading={posts.length < 0}>
          <Grid container spacing={3}>
            {posts.map((post: any) => (
              <Grid key={post._id} item xs={12} md={6} lg={4}>
                <Post title={post.title} content={post.content} />
              </Grid>
            ))}
          </Grid>
        </WaitFor>
      </Container>
    </>
  )
}

export default Posts
