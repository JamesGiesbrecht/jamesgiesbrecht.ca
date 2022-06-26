import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Theme,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { FC } from 'react'

import ROUTES from 'consts/routes'
import { BlogPostData } from 'ts/app/types'
import { getDateFromString } from 'utility'

interface Props {
  post: BlogPostData
}

const useStyles = makeStyles((theme: Theme) => ({
  blogCard: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    },
  },
}))

const BlogListing: FC<Props> = ({ post }) => {
  const classes = useStyles()
  const router = useRouter()

  const {
    slug,
    metadata: { title, date, metaDesc, tags },
  } = post

  const handleGoToBlogPost = () => {
    router.push(`${ROUTES.blog.path}/${slug}`)
  }

  return (
    <Grid item xs={12} md={6}>
      <Card raised className={classes.blogCard} onClick={handleGoToBlogPost}>
        <CardHeader title={title} subheader={format(getDateFromString(date), 'MMMM d, yyyy')} />
        <CardContent>
          <Typography>{metaDesc}</Typography>
        </CardContent>
        <CardActions>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default BlogListing
