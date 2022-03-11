import { FC, MouseEvent, useState } from 'react'
import { Delete, Edit, MoreHoriz } from '@mui/icons-material'
import {
  Box,
  Card,
  Typography,
  IconButton,
  Modal,
  Button,
  CircularProgress,
  CardContent,
  CardActions,
  CardHeader,
  Menu,
  MenuItem,
  ListItemIcon,
  Theme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import Fade from 'react-reveal/Fade'

import PostModal from 'components/sections/posts/PostModal'
import { useAuth } from 'context/Auth'

// eslint-disable-next-line import/no-relative-packages
import { DeletePostResponse, UpdatePostRequest } from '../../../../@types/james-giesbrecht'

interface Props {
  postId: string
  title: string
  content: string
  isPublic: boolean
  isUser: boolean
  name: string
  date: Date
  onRemove: (id: string) => void
  onUpdate: (post: UpdatePostRequest) => Promise<void>
  className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: '90%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  loader: {
    color: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 500],
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const Post: FC<Props> = ({
  postId,
  title,
  content,
  isPublic,
  isUser,
  name,
  date,
  onRemove,
  onUpdate,
  className,
}) => {
  const classes = useStyles()
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [updateOpen, setUpdateOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const openMenu = Boolean(anchorEl)
  const { enqueueSnackbar } = useSnackbar()
  const { api } = useAuth()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const dateFormatted = `${date.toLocaleString('default', {
    month: 'short',
  })}  ${date.getDate()}, ${date.getHours()}:${minutes}`

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  const handleOpenUpdateModal = () => setUpdateOpen(true)

  const handleCloseUpdateModal = () => {
    setUpdateOpen(false)
    handleMenuClose()
  }

  const handleOpenDeleteModal = () => setDeleteOpen(true)

  const handleCloseDeleteModal = () => {
    setDeleteOpen(false)
    setIsLoading(false)
    handleMenuClose()
  }

  const deletePost = () => {
    setIsLoading(true)
    api
      .delete(`/api/posts/${postId}`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response: AxiosResponse<DeletePostResponse>) => {
        onRemove(postId)
        enqueueSnackbar('Post Deleted Successfully', { variant: 'success' })
      })
      .catch(() => {
        enqueueSnackbar('Error Deleting Post', { variant: 'error' })
      })
      .finally(() => handleCloseDeleteModal())
  }

  const deleteConfirmation = (
    <Card raised className={classes.card}>
      <CardContent>Do you want to delete this post forever?</CardContent>
      <CardActions className={classes.actions}>
        <Button color="primary" variant="contained" onClick={deletePost}>
          {isLoading ? <CircularProgress className={classes.loader} /> : 'Delete'}
        </Button>
        <Button color="secondary" variant="contained" onClick={handleCloseDeleteModal}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  )

  return (
    <Fade up>
      <Card raised className={className}>
        <CardHeader
          title={title}
          action={
            isUser && (
              <>
                <IconButton onClick={handleMenuOpen} size="large">
                  <MoreHoriz />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleOpenUpdateModal}>
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleOpenDeleteModal}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    Delete
                    <Modal open={deleteOpen} onClose={handleCloseDeleteModal}>
                      {deleteConfirmation}
                    </Modal>
                  </MenuItem>
                </Menu>
              </>
            )
          }
          subheader={
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="textSecondary">
                {dateFormatted}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {name}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography>{content}</Typography>
        </CardContent>
      </Card>
      <PostModal
        open={updateOpen}
        postContent={{ postId, title, content, isPublic }}
        onSubmit={onUpdate}
        onClose={handleCloseUpdateModal}
      />
    </Fade>
  )
}

export default Post
