import React, { useState, useContext } from 'react'
import { Box, Card, Typography, makeStyles, IconButton, Modal, Button, CircularProgress } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import useApi from 'hooks/useApi'
import { AxiosResponse } from 'axios'
import { truncateSync } from 'fs'

interface Props {
  postId: string,
  title: string,
  content: string,
  isUser: boolean,
  postUser: any,
  date: Date,
  removePost: () => void,
  className?: string,
}

const useStyles = makeStyles((theme) => ({
  post: {
    padding: theme.spacing(2),
  },
  delete: {
    marginRight: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxWidth: '90%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  loader: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 300 : 500],
  },
}))

const Post: React.FC<Props> = ({ postId, title, content, isUser, postUser, date, removePost, className }) => {
  const classes = useStyles()
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const api = useApi()
  const dateFormatted = `${date.toLocaleString('default', { month: 'short' })}  ${date.getDay()}, ${date.getHours()}:${date.getMinutes()}`

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
      <Typography>Do you want to delete this post forever?</Typography>
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Button className={classes.delete} color="primary" variant="contained" onClick={deletePost}>
          {isLoading ? <CircularProgress className={classes.loader} /> : 'Delete' }
        </Button>
        <Button color="secondary" variant="contained" onClick={handleModalClose}>Cancel</Button>
      </Box>
    </Card>
  )

  return (
    <Card className={[classes.post, className].join(' ')}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{title}</Typography>
        {isUser && (
          <>
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
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="textSecondary">{dateFormatted}</Typography>
        <Typography variant="subtitle1" color="textSecondary">{postUser.name}</Typography>
      </Box>
      <Typography>{content}</Typography>
    </Card>
  )
}

export default Post
