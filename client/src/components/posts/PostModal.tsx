import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import { Close } from '@mui/icons-material'
import {
  Button,
  Card,
  TextField,
  FormControlLabel,
  Switch,
  CircularProgress,
  Modal,
  Box,
  IconButton,
  CardHeader,
  CardContent,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import { NewPostRequest, UpdatePostRequest } from 'ts/api/types'

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
  open: boolean
  postContent?: UpdatePostRequest
  onClose: () => void
  onSubmit: (post: NewPostRequest | UpdatePostRequest) => Promise<void>
}

const NewPost: FC<Props> = ({ open, postContent, onSubmit, onClose }) => {
  const classes = useStyles()
  const [title, setTitle] = useState<string>(postContent ? postContent.title : '')
  const [titleError, setTitleError] = useState<string>('')
  const [content, setContent] = useState<string>(postContent ? postContent.content : '')
  const [contentError, setContentError] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(postContent ? postContent.isPublic : false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleModalClose = () => {
    setTitleError('')
    setContentError('')
    setIsPublic(false)
    onClose()
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (e.target.value.trim()) setTitleError('')
  }

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const hasTitleError = validateInputEmpty(title, setTitleError, 'Title')
    const hasContentError = validateInputEmpty(content, setContentError, 'Content')

    if (!hasTitleError && !hasContentError) {
      setIsSubmitting(true)
      await onSubmit({ title, content, isPublic, postId: postContent?.postId })
      setIsSubmitting(false)
      handleModalClose()
    }
  }

  const submitText = postContent ? 'Update' : 'Submit'

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Card raised className={classes.card}>
        <CardHeader
          title={postContent ? 'Edit Post' : 'Make a New Post'}
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
    </Modal>
  )
}

export default NewPost
