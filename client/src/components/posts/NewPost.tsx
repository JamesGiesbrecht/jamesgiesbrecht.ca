import React, { useState } from 'react'
import { AxiosResponse } from 'axios'
import { Button, Card, TextField, makeStyles, Typography, FormControlLabel, Switch, CircularProgress } from '@material-ui/core'
import useApi from 'hooks/useApi'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
  },
  newPostForm: {
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
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const api = useApi()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
      .finally(() => setIsSubmitting(false))
  }

  return (
    <Card className={classes.card}>
      <Typography variant="h5">Make a New Post</Typography>
      <form className={classes.newPostForm} onSubmit={handleSubmit}>
        <TextField
          variant="filled"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        <TextField
          variant="filled"
          id="content"
          placeholder="Content"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
    </Card>
  )
}

export default NewPost
