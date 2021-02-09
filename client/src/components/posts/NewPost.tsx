import React, { useState } from 'react'
import { Button, Card, TextField, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
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
}))

const NewPost: React.FC = () => {
  const classes = useStyles()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
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
        />
        <TextField
          variant="filled"
          id="content"
          placeholder="Content"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Card>
  )
}

export default NewPost
