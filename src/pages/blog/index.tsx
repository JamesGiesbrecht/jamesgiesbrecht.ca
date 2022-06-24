import {
  Container,
  Typography,
  Theme,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FILESYSTEM } from 'consts/app'
import ROUTES from 'consts/routes'
import fs from 'fs'
import matter from 'gray-matter'
import { InferGetStaticPropsType, NextPage } from 'next'
import RouterLink from 'next/link'

export const getStaticProps = async () => {
  const files = fs.readdirSync(FILESYSTEM.POSTS)

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(FILESYSTEM.POSTS + fileName, 'utf-8')
    const { data: metadata } = matter(readFile)
    return {
      slug,
      metadata,
    }
  })

  return {
    props: {
      posts,
    },
  }
}

const useStyles = makeStyles((theme: Theme) => ({}))

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Blog
      </Typography>
      <List>
        {posts.map(({ slug, metadata }) => (
          <ListItem key={slug}>
            <ListItemButton component="a">
              <RouterLink href={`${ROUTES.blog.path}/${slug}`} passHref>
                <ListItemText primary={metadata.title} />
              </RouterLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Blog
