import { FC } from 'react'
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
import fs from 'fs'
import matter from 'gray-matter'
import RouterLink from 'next/link'

export const getStaticProps = async () => {
  const files = fs.readdirSync(FILESYSTEM.POSTS)

  const blogPosts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(FILESYSTEM.POSTS + fileName, 'utf-8')
    const { data: frontMatter } = matter(readFile)
    return {
      slug,
      frontMatter,
    }
  })

  return {
    props: {
      blogPosts,
    },
  }
}

const useStyles = makeStyles((theme: Theme) => ({}))

const Blog: FC = ({ blogPosts }: any) => {
  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Blog
      </Typography>
      <List>
        {blogPosts.map(({ slug, frontMatter }: any) => (
          <ListItem key={slug}>
            <ListItemButton component="a">
              <RouterLink href={`/blog/${slug}`} passHref>
                <ListItemText primary={frontMatter.title} />
              </RouterLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Blog
