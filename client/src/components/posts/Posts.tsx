import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { Box, Container, Typography, Theme, Link } from '@mui/material'
import { useTheme, makeStyles } from '@mui/styles'
import { AxiosResponse } from 'axios'
import Masonry from 'react-masonry-css'
import { Link as RouterLink } from 'react-router-dom'

import { AuthContext } from 'context/Auth'
import NewPost from 'components/posts/NewPost'
import Post from 'components/posts/Post'
import InfoMessage from 'components/ui/InfoMessage'
import WaitFor from 'components/utility/WaitFor'
import { PostType } from 'ts/app/types'

const gridGutter = 15

const useStyles = makeStyles(() => ({
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

const Posts: FC = () => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)
  const { api, authInitialized, user } = useContext(AuthContext)

  const columnBreakpoints = {
    default: 3,
    [theme.breakpoints.values.lg]: 2,
    [theme.breakpoints.values.md]: 1,
  }

  const handleRemovePost = (id: string) => setPosts((prev) => prev.filter((p) => p._id !== id))

  const handleUpdatePost = () => {}

  useEffect(() => {
    if (authInitialized) {
      setIsLoading(true)
      api
        .get('/api/posts')
        .then((result: AxiosResponse<PostType[]>) => {
          setPosts(result.data)
        })
        .catch(() => {
          setHasError(true)
        })
        .finally(() => setIsLoading(false))
    }
  }, [authInitialized, api])

  let content

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
            isUser={user ? user.uid === post.uid : false}
            name={post.username}
            date={new Date(post.dateCreated)}
            onRemove={handleRemovePost}
            setPosts={setPosts}
            onUpdate={handleUpdatePost}
          />
        ))}
      </Masonry>
    )
  } else {
    let message: ReactNode = ''
    if (hasError) {
      message = 'Uh oh, something went wrong.'
    } else if (user) {
      message = "No posts to show, why don't you try making one?"
    } else {
      message = [
        "No posts to show, why don't you ",
        <Link key="link" component={RouterLink} to="/login">
          sign-up and try making one
        </Link>,
        '?',
      ]
    }
    content = <Typography variant="h6">{message}</Typography>
  }

  return (
    <>
      <InfoMessage title="What is this Page About?" id="postsAbout">
        <Typography>
          I wanted to learn basic CRUD operations (create, read, update, delete) in NodeJS and
          MongoDB, so here we are!
        </Typography>
        <Typography>
          This page is just meant as a demo and not to provide any production level functionality.
          If you choose to make a post, the first part of your email will be displayed, everything
          before the "@".
        </Typography>
        <Typography>
          Authenticated users can create, edit, or delete posts to be shown here. Users will be able
          to see their own posts, along with all other posts made public by other users.
        </Typography>
      </InfoMessage>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h3">Posts</Typography>
        {user ? (
          <NewPost setPosts={setPosts} />
        ) : (
          <Link component={RouterLink} to="/login">
            Login to submit a post
          </Link>
        )}
      </Box>
      <Container>
        <WaitFor isLoading={isLoading || !authInitialized}>{content}</WaitFor>
      </Container>
    </>
  )
}

export default Posts
