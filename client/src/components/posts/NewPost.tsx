import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { Add, Close } from '@mui/icons-material'
import {
  Button,
  Card,
  TextField,
  FormControlLabel,
  Switch,
  CircularProgress,
  Fab,
  Modal,
  Box,
  IconButton,
  useMediaQuery,
  Theme,
  CardHeader,
  CardContent,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AxiosResponse } from 'axios'

import { useAuth } from 'context/Auth'
import useNotification from 'hooks/useNotification'
import { NewPostResponse, UpdatePostResponse } from 'ts/api/types'
import { PostType } from 'ts/app/types'

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    maxWidth: '90%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 999,
    },
  },
  buttonBottom: {
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(10),
    },
  },
  buttonIcon: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
    },
    '& button': {
      maxWidth: 150,
    },
  },
  formBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loader: {
    color: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 500],
  },
}))

interface Props {
  // FIXME
  setPosts: Dispatch<any>
  onUpdate?: (postId: string, post: PostType) => void
  isEdit?: {
    postId: string
    title: string
    content: string
    isPublic: boolean
  }
  render?: (onClick: () => void) => JSX.Element
  onClose?: () => void
}

const NewPost: FC<Props> = ({ setPosts, onUpdate, isEdit, render, onClose }) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(isEdit ? isEdit.title : '')
  const [titleError, setTitleError] = useState<string>('')
  const [content, setContent] = useState<string>(isEdit ? isEdit.content : '')
  const [contentError, setContentError] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(isEdit ? isEdit.isPublic : false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isBottom, setIsBottom] = useState<boolean>(false)
  const notify = useNotification()
  const { api } = useAuth()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const postId = isEdit ? isEdit.postId : ''

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 30
    setIsBottom(bottom)
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleModalOpen = () => setModalOpen(true)

  const handleModalClose = () => {
    setTitleError('')
    setContentError('')
    setModalOpen(false)
    if (onClose) onClose()
  }

  // FIXME
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
    if (e.target.value.trim()) setTitleError('')
  }

  // FIXME
  const handleContentChange = (e: any) => {
    setContent(e.target.value)
    if (e.target.value.trim()) setContentError('')
  }

  const validateInputEmpty = (
    input: string,
    setInputError: Dispatch<SetStateAction<string>>,
    inputName: string,
  ): boolean => {
    if (input) {
      setInputError('')
      return false
    }
    setInputError(`${inputName} must not be empty`)
    return true
  }

  const editPost = () => {
    api
      .put(`/api/posts/${postId}`, { title, content, isPublic })
      // FIXME
      .then((result: AxiosResponse<UpdatePostResponse>) => {
        setTitle('')
        setContent('')
        setIsPublic(false)
        if (onUpdate) onUpdate(postId, result.data.post)
        notify('Post Updated', 'success')
      })
      // FIXME
      .catch(() => {
        notify('Error Updating Post', 'error')
      })
      .finally(() => {
        setIsSubmitting(false)
        handleModalClose()
      })
  }

  const submitPost = () => {
    api
      .post('/api/posts/new', { title, content, isPublic })
      .then((result: AxiosResponse<NewPostResponse>) => {
        setTitle('')
        setContent('')
        setIsPublic(false)
        notify('Post Submitted', 'success')
        // FIXME
        setPosts((prev: any) => [result.data, ...prev])
      })
      // FIXME
      .catch(() => {
        notify('Error Submitting Post', 'error')
      })
      .finally(() => {
        setIsSubmitting(false)
        handleModalClose()
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const hasTitleError = validateInputEmpty(title, setTitleError, 'Title')
    const hasContentError = validateInputEmpty(content, setContentError, 'Content')

    if (!hasTitleError && !hasContentError) {
      setIsSubmitting(true)
      if (isEdit) {
        editPost()
      } else {
        submitPost()
      }
    }
  }

  const newPostButton = (
    <Fab
      className={`${classes.button}${isBottom ? ` ${classes.buttonBottom}` : ''}`}
      color="primary"
      variant={isMobile ? 'circular' : 'extended'}
      size={isMobile ? 'large' : 'medium'}
      onClick={handleModalOpen}
    >
      <Add className={classes.buttonIcon} />
      {!isMobile && 'New Post'}
    </Fab>
  )

  const submitText = isEdit ? 'Edit' : 'Submit'

  const newPostForm = (
    <Card raised className={classes.card}>
      <CardHeader
        title={isEdit ? 'Edit Post' : 'Make a New Post'}
        action={
          <IconButton onClick={handleModalClose} size="large">
            <Close />
          </IconButton>
        }
      />
      <CardContent>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="filled"
            id="title"
            placeholder="Title"
            error={Boolean(titleError)}
            helperText={titleError}
            value={title}
            onChange={handleTitleChange}
            disabled={isSubmitting}
          />
          <TextField
            variant="filled"
            id="content"
            placeholder="Content"
            error={Boolean(contentError)}
            helperText={contentError}
            multiline
            rows={4}
            value={content}
            onChange={handleContentChange}
            disabled={isSubmitting}
          />
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress className={classes.loader} /> : submitText}
            </Button>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  disabled={isSubmitting}
                />
              }
              label="Public?"
              labelPlacement="start"
            />
          </Box>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <>
      {render ? render(handleModalOpen) : newPostButton}
      <Modal open={modalOpen} onClose={handleModalClose}>
        {newPostForm}
      </Modal>
    </>
  )
}

export default NewPost
