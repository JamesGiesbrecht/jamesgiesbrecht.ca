import { FC, useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import Masonry from 'react-masonry-css'
import { Box, Container, Typography, makeStyles, Theme, Link } from '@material-ui/core'
import Post from 'components/posts/Post'
import NewPost from 'components/posts/NewPost'
import WaitFor from 'components/utility/WaitFor'
import { useTheme } from '@material-ui/styles'
import { AuthContext } from 'context/Auth'
import { Link as RouterLink } from 'react-router-dom'
import InfoMessage from 'components/ui/InfoMessage'

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
  const [posts, setPosts] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)
  const { api, authInitialized, user } = useContext(AuthContext)

  const columnBreakpoints = {
    default: 3,
    [theme.breakpoints.values.lg]: 2,
    [theme.breakpoints.values.md]: 1,
  }

  useEffect(() => {
    if (authInitialized) {
      setIsLoading(true)
      api
        .get('/api/posts')
        .then((result: AxiosResponse<any>) => {
          setPosts(result.data)
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.log(error)
          setHasError(true)
        })
        .finally(() => setIsLoading(false))
    }
  }, [authInitialized, api])

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
            isUser={user ? user.uid === post.uid : false}
            name={post.username}
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
      message = "No posts to show, why don't you try making one?"
    } else {
      // eslint-disable-next-line react/jsx-one-expression-per-line
      message = [
        "No posts to show, why don't you ",
        <Link component={RouterLink} to="/login">
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
        {user && <NewPost setPosts={setPosts} />}
      </Box>
      <Container>
        <WaitFor isLoading={isLoading || !authInitialized}>{content}</WaitFor>
      </Container>
    </>
  )
}

export default Posts
