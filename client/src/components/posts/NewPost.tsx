import React, { useState } from 'react'
import { AxiosResponse } from 'axios'
import { Button, Card, TextField, makeStyles, FormControlLabel, Switch, CircularProgress, Fab, Modal, Box, IconButton, useMediaQuery, Theme, CardHeader, CardContent } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import useApi from 'hooks/useApi'
import useNotification from 'hooks/useNotification'

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
    [theme.breakpoints.down('xs')]: {
      position: 'sticky',
      bottom: theme.spacing(2),
      marginLeft: '85%',
      zIndex: 999,
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
    color: theme.palette.grey[theme.palette.type === 'light' ? 300 : 500],
  },
}))

interface Props {
  setPosts: React.Dispatch<any>
  isEdit?: {
    postId: String
    title: String
    content: String
    isPublic: boolean
  }
  render?: (onClick: () => void) => JSX.Element
  onClose?: () => void
}

const NewPost: React.FC<Props> = ({ setPosts, isEdit, render, onClose }) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<String>(isEdit ? isEdit.title : '')
  const [titleError, setTitleError] = useState<String>('')
  const [content, setContent] = useState<String>(isEdit ? isEdit.content : '')
  const [contentError, setContentError] = useState<String>('')
  const [isPublic, setIsPublic] = useState<boolean>(isEdit ? isEdit.isPublic : false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const notify = useNotification()
  const api = useApi()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const postId = isEdit ? isEdit.postId : null

  const handleModalOpen = () => setModalOpen(true)

  const handleModalClose = () => {
    setTitleError('')
    setContentError('')
    setModalOpen(false)
    if (onClose) onClose()
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
    if (e.target.value.trim()) setTitleError('')
  }

  const handleContentChange = (e: any) => {
    setContent(e.target.value)
    if (e.target.value.trim()) setContentError('')
  }

  const validateInputEmpty = (input: String, setInputError: React.Dispatch<React.SetStateAction<String>>, inputName: String): boolean => {
    if (input) {
      setInputError('')
      return false
    }
    setInputError(`${inputName} must not be empty`)
    return true
  }

  const editPost = () => {
    api.put(`/api/posts/${postId}`, { title, content, isPublic })
      .then((result: AxiosResponse<any>) => {
        console.log(result)
        setTitle('')
        setContent('')
        setIsPublic(false)
        notify('Post Updated', 'success')
        setPosts((prev: any) => prev.map((p: any) => (p._id === postId ? result.data.post : p)))
      })
      .catch((error: any) => {
        console.log(error)
        notify('Error Updating Post', 'error')
      })
      .finally(() => {
        setIsSubmitting(false)
        handleModalClose()
      })
  }

  const submitPost = () => {
    api.post('/api/posts/new', { title, content, isPublic })
      .then((result: AxiosResponse<any>) => {
        console.log(result)
        setTitle('')
        setContent('')
        setIsPublic(false)
        notify('Post Submitted', 'success')
        setPosts((prev: any) => [result.data, ...prev])
      })
      .catch((error: any) => {
        console.log(error)
        notify('Error Submitting Post', 'error')
      })
      .finally(() => {
        setIsSubmitting(false)
        handleModalClose()
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      className={classes.button}
      color="primary"
      variant={isMobile ? 'round' : 'extended'}
      size={isMobile ? 'large' : 'medium'}
      onClick={handleModalOpen}
    >
      <Add className={classes.buttonIcon} />
      {!isMobile && 'New Post'}
    </Fab>
  )

  const submitText = isEdit ? 'Edit' : 'Submit'

  const newPostForm = (
    <Card className={classes.card}>
      <CardHeader
        title={isEdit ? 'Edit Post' : 'Make a New Post'}
        action={(
          <IconButton onClick={handleModalClose}>
            <Close />
          </IconButton>
        )}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress className={classes.loader} /> : submitText }
            </Button>
            <FormControlLabel
              control={(
                <Switch
                  color="primary"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  disabled={isSubmitting}
                />
              )}
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
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        {newPostForm}
      </Modal>
    </>
  )
}

export default NewPost
