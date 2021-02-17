import React, { useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import Masonry from 'react-masonry-css'
import { Box, Container, Typography, makeStyles, Theme, Link } from '@material-ui/core'
import Post from 'components/posts/Post'
import NewPost from 'components/posts/NewPost'
import useApi from 'hooks/useApi'
import WaitFor from 'components/utility/WaitFor'
import { useTheme } from '@material-ui/styles'
import { AuthContext } from 'context/Auth'
import { Link as RouterLink } from 'react-router-dom'
import InfoMessage from 'components/ui/InfoMessage'

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
  const [posts, setPosts] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)
  const { user } = useContext(AuthContext)
  const api = useApi()

  const columnBreakpoints = {
    default: 3,
    [theme.breakpoints.values.lg]: 2,
    [theme.breakpoints.values.md]: 1,
  }

  useEffect(() => {
    api.get('/api/posts')
      .then((result: AxiosResponse<any>) => {
        // console.log(result)
        setPosts(result.data)
      })
      .catch((error: any) => {
        console.log(error)
        setHasError(true)
      })
      .finally(() => setIsLoading(false))
  }, [])

  let content
  let message: string | Array<any> = ''

  if (posts.length > 0) {
    content = (
      <Masonry
        breakpointCols={columnBreakpoints}
        className={classes.posts}
        columnClassName={classes.postItem}
      >
        {posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            className={classes.post}
            title={post.title}
            content={post.content}
            isPublic={post.isPublic}
            isUser={user && user.profile.email === post.user.email}
            postUser={post.user}
            date={new Date(post.dateCreated)}
            removePost={() => setPosts((prev) => prev.filter((p) => p._id !== post._id))}
            setPosts={setPosts}
          />
        ))}
      </Masonry>
    )
  } else {
    if (hasError) {
      message = 'Uh oh, something went wrong.'
    } else if (user) {
      message = 'No posts to show, why don\'t you try making one?'
    } else {
      // eslint-disable-next-line react/jsx-one-expression-per-line
      message = ['No posts to show, why don\'t you ', <Link component={RouterLink} to="/login">sign-up and try making one</Link>, '?']
    }
    content = <Typography variant="h6">{message}</Typography>
  }

  return (
    <>
      <InfoMessage title="What is this Page About?" id="postsAbout">
        <Typography>
          I wanted to learn basic CRUD operations (create, read, update, delete) in NodeJS and MongoDB, so here we are!
        </Typography>
        <Typography>
          This page is just meant as a demo and not to provide any production level functionality.
        </Typography>
        <Typography>
          Authenticated users can create, edit, or delete posts to be shown here. Users will be able to see their own posts, along with all other posts made public by other users.
        </Typography>
      </InfoMessage>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h3">Posts</Typography>
        {user && <NewPost setPosts={setPosts} />}
      </Box>
      <Container>
        <WaitFor isLoading={isLoading}>
          {content}
        </WaitFor>
      </Container>
    </>
  )
}

export default Posts
