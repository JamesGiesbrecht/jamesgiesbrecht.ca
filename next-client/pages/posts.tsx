import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import RouterLink from 'next/link'
import { Add } from '@mui/icons-material'
import { Box, Container, Typography, Theme, Link, Fab, useMediaQuery, Button } from '@mui/material'
import { useTheme, makeStyles } from '@mui/styles'
import { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import Masonry from 'react-masonry-css'

import { AuthContext } from 'context/Auth'
import Post from 'components/sections/posts/Post'
import PostModal from 'components/sections/posts/PostModal'
import InfoMessage from 'components/utility/InfoMessage'
import WaitFor from 'components/utility/WaitFor'
import {
  GetPostsResponse,
  NewPostRequest,
  NewPostResponse,
  PostType,
  UpdatePostRequest,
  UpdatePostResponse,
  // eslint-disable-next-line import/no-relative-packages
} from '../../@types/james-giesbrecht'

const gridGutter = 15

const useStyles = makeStyles((theme: Theme) => ({
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
  button: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 999,
    },
  },
  buttonIcon: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
}))

const Posts: FC = () => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { api, authInitialized, user } = useContext(AuthContext)
  const isMobile = useMediaQuery(() => theme.breakpoints.down('sm'))
  const { enqueueSnackbar } = useSnackbar()

  const columnBreakpoints = {
    default: 3,
    [theme.breakpoints.values.lg]: 2,
    [theme.breakpoints.values.md]: 1,
  }

  const handleModalOpen = () => setModalOpen(true)

  const handleModalClose = () => setModalOpen(false)

  const handleRemovePost = (id: string) => setPosts((prev) => prev.filter((p) => p._id !== id))

  const handleUpdatePost = ({ title, content, isPublic, postId }: UpdatePostRequest) =>
    api
      .put(`/api/posts/${postId}`, { title, content, isPublic })
      .then((result: AxiosResponse<UpdatePostResponse>) => {
        setPosts((prev) => prev.map((p) => (p._id === postId ? result.data.post : p)))
        enqueueSnackbar('Post Updated Successfully', { variant: 'success' })
      })
      .catch(() => {
        enqueueSnackbar('Error Updating Post', { variant: 'error' })
      })

  const handleSubmitNewPost = async (post: NewPostRequest) =>
    api
      .post('/api/posts/new', post)
      .then((result: AxiosResponse<NewPostResponse>) => {
        enqueueSnackbar('Post Submitted Successfully', { variant: 'success' })
        setPosts((prev) => [result.data, ...prev])
      })
      .catch(() => {
        enqueueSnackbar('Error Submitting Post', { variant: 'error' })
      })
      .finally(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      })

  useEffect(() => {
    if (authInitialized) {
      setIsLoading(true)
      api
        .get('/api/posts')
        .then((result: AxiosResponse<GetPostsResponse>) => {
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
        <RouterLink key="link" href="/login" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link>sign-up and try making one</Link>
        </RouterLink>,
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
      <Button
        variant="contained"
        onClick={() =>
          enqueueSnackbar(`Test Notification ${Math.random()}`, { variant: 'success' })
        }
      >
        Test Notification
      </Button>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h3">Posts</Typography>
        {user ? (
          <Fab
            className={classes.button}
            color="primary"
            variant={isMobile ? 'circular' : 'extended'}
            size={isMobile ? 'large' : 'medium'}
            onClick={handleModalOpen}
          >
            <Add className={classes.buttonIcon} />
            {!isMobile && 'New Post'}
          </Fab>
        ) : (
          <RouterLink href="/login" passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link>Login to submit a post</Link>
          </RouterLink>
        )}
      </Box>
      <PostModal open={modalOpen} onSubmit={handleSubmitNewPost} onClose={handleModalClose} />
      <Container>
        <WaitFor isLoading={isLoading || !authInitialized}>{content}</WaitFor>
      </Container>
    </>
  )
}

export default Posts
