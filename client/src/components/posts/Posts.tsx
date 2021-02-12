import React, { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import Masonry from 'react-masonry-css'
import { Box, Container, Grid, Typography, makeStyles, Theme } from '@material-ui/core'
import Post from 'components/posts/Post'
import NewPost from 'components/posts/NewPost'
import useApi from 'hooks/useApi'
import WaitFor from 'components/utility/WaitFor'
import { useTheme } from '@material-ui/styles'

const gridGutter = 15

const useStyles = makeStyles((theme) => ({
  posts: {
    display: 'flex',
    marginLeft: -gridGutter,
    width: 'auto',
  },
  postItem: {
    paddingLeft: gridGutter,
  },
  post: {
    marginBottom: gridGutter,
  },
}))

const Posts: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [posts, setPosts] = useState<any>([])
  const api = useApi()

  const columnBreakpoints = {
    default: 3,
    [theme.breakpoints.values.lg]: 2,
    [theme.breakpoints.values.md]: 1,
  }

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
          {/* <Grid container spacing={3}> */}
          <Masonry
            breakpointCols={columnBreakpoints}
            className={classes.posts}
            columnClassName={classes.postItem}
          >
            {posts.map((post: any) => (
              <Post
                key={post._id}
                className={classes.post}
                title={post.title}
                name={post.user.name}
                date={new Date(post.dateCreated)}
                content={post.content}
              />
            ))}
          </Masonry>
          {/* </Grid> */}
        </WaitFor>
      </Container>
    </>
  )
}

export default Posts
