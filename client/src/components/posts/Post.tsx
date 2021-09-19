import { Dispatch, FC, MouseEvent, useState } from 'react'
import Fade from 'react-reveal/Fade'
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
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Delete, Edit, MoreHoriz } from '@mui/icons-material'
import NewPost from 'components/posts/NewPost'
import { useAuth } from 'context/Auth'

interface Props {
  postId: string
  title: string
  content: string
  isPublic: boolean
  isUser: boolean
  name: string
  date: Date
  removePost: () => void
  // FIXME
  setPosts: Dispatch<any>
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
  removePost,
  setPosts,
  className,
}) => {
  const classes = useStyles()
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const openMenu = Boolean(anchorEl)
  const { api } = useAuth()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const dateFormatted = `${date.toLocaleString('default', {
    month: 'short',
  })}  ${date.getDate()}, ${date.getHours()}:${minutes}`

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  const handleModalOpen = () => setDeleteOpen(true)

  const handleModalClose = () => {
    setDeleteOpen(false)
    setIsLoading(false)
    handleMenuClose()
  }

  const deletePost = () => {
    setIsLoading(true)
    api
      .delete(`/api/posts/${postId}`)
      .then(() => {
        removePost()
      })
      // FIXME
      // eslint-disable-next-line no-console
      .catch((error: any) => console.log(error))
      .finally(() => handleModalClose())
  }

  const deleteConfirmation = (
    <Card raised className={classes.card}>
      <CardContent>Do you want to delete this post forever?</CardContent>
      <CardActions className={classes.actions}>
        <Button color="primary" variant="contained" onClick={deletePost}>
          {isLoading ? <CircularProgress className={classes.loader} /> : 'Delete'}
        </Button>
        <Button color="secondary" variant="contained" onClick={handleModalClose}>
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
                  <NewPost
                    setPosts={setPosts}
                    isEdit={{ postId, title, content, isPublic }}
                    render={(onClick) => (
                      <MenuItem onClick={onClick}>
                        <ListItemIcon>
                          <Edit fontSize="small" />
                        </ListItemIcon>
                        Edit
                      </MenuItem>
                    )}
                    onClose={handleMenuClose}
                  />
                  <MenuItem onClick={handleModalOpen}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    Delete
                    <Modal open={deleteOpen} onClose={handleModalClose}>
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
    </Fade>
  )
}

export default Post
