import React, { useState, useContext } from 'react'
import { Box, Card, Typography, makeStyles, IconButton, Modal, Button, CircularProgress, CardContent, CardActions, CardHeader } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import NewPost from 'components/posts/NewPost'
import useApi from 'hooks/useApi'
import { AxiosResponse } from 'axios'

interface Props {
  postId: string
  title: string
  content: string
  isPublic: boolean
  isUser: boolean
  postUser: any
  date: Date
  removePost: () => void
  setPosts: React.Dispatch<any>
  className?: string
}

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '90%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  loader: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 300 : 500],
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const Post: React.FC<Props> = ({ postId, title, content, isPublic, isUser, postUser, date, removePost, setPosts, className }) => {
  const classes = useStyles()
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const api = useApi()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const dateFormatted = `${date.toLocaleString('default', { month: 'short' })}  ${date.getDay()}, ${date.getHours()}:${minutes}`

  const handleModalOpen = () => setDeleteOpen(true)

  const handleModalClose = () => {
    setDeleteOpen(false)
    setIsLoading(false)
  }

  const deletePost = () => {
    setIsLoading(true)
    api.delete(`/api/posts/${postId}`)
      .then((result: AxiosResponse<any>) => {
        console.log(result)
        removePost()
      })
      .catch((error: any) => console.log(error))
      .finally(() => handleModalClose())
  }

  const deleteConfirmation = (
    <Card className={classes.card}>
      <CardContent>Do you want to delete this post forever?</CardContent>
      <CardActions className={classes.actions}>
        <Button color="primary" variant="contained" onClick={deletePost}>
          {isLoading ? <CircularProgress className={classes.loader} /> : 'Delete' }
        </Button>
        <Button color="secondary" variant="contained" onClick={handleModalClose}>Cancel</Button>
      </CardActions>
    </Card>
  )

  return (
    <Card className={className}>
      <CardHeader
        title={title}
        action={isUser && (
          <>
            {/* eslint-disable-next-line react/button-has-type */}
            <NewPost setPosts={setPosts} isEdit={{ title, content, isPublic, render: (onClick) => <button onClick={onClick}>edit</button> }} />
            <IconButton onClick={handleModalOpen}>
              <Delete />
            </IconButton>
            <Modal
              open={deleteOpen}
              onClose={handleModalClose}
            >
              {deleteConfirmation}
            </Modal>
          </>
        )}
        subheader={(
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" color="textSecondary">{dateFormatted}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{postUser.name}</Typography>
          </Box>
        )}
      />
      <CardContent><Typography>{content}</Typography></CardContent>
    </Card>
  )
}

export default Post
