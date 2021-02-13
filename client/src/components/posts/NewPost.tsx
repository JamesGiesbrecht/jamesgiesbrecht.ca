import React, { useState } from 'react'
import { AxiosResponse } from 'axios'
import { Button, Card, TextField, makeStyles, Typography, FormControlLabel, Switch, CircularProgress, Fab, Modal, Box, IconButton, useMediaQuery, Theme, CardHeader, CardContent } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import useApi from 'hooks/useApi'

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
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
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
}

const NewPost: React.FC<Props> = ({ setPosts }) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [titleError, setTitleError] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [contentError, setContentError] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const api = useApi()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

  const handleModalOpen = () => setModalOpen(true)

  const handleModalClose = () => {
    setTitleError('')
    setContentError('')
    setModalOpen(false)
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
    if (e.target.value.trim()) setTitleError('')
  }

  const handleContentChange = (e: any) => {
    setContent(e.target.value)
    if (e.target.value.trim()) setContentError('')
  }

  const validateInputEmpty = (input: string, setInputError: React.Dispatch<React.SetStateAction<string>>, inputName: string): boolean => {
    if (input) {
      setInputError('')
      return false
    }
    setInputError(`${inputName} must not be empty`)
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const hasTitleError = validateInputEmpty(title, setTitleError, 'Title')
    const hasContentError = validateInputEmpty(content, setContentError, 'Content')

    if (!hasTitleError && !hasContentError) {
      setIsSubmitting(true)
      api.post('/api/posts/new', { title, content, isPublic })
        .then((result: AxiosResponse<any>) => {
          console.log(result)
          setTitle('')
          setContent('')
          setIsPublic(false)
          setPosts((prev: any) => [result.data, ...prev])
        })
        .catch((error: any) => console.log(error))
        .finally(() => {
          setIsSubmitting(false)
          handleModalClose()
        })
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

  const newPostForm = (
    <Card className={classes.card}>
      <CardHeader
        title="Make a New Post"
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
          <div className={classes.formBottom}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress className={classes.loader} /> : 'Submit' }
            </Button>
            <FormControlLabel
              control={(
                <Switch
                  color="primary"
                  id="isPublic"
                  value={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  disabled={isSubmitting}
                />
              )}
              label="Public?"
              labelPlacement="start"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <>
      {newPostButton}
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
