import { Container, Typography, Grid } from '@mui/material'
import matter from 'gray-matter'
import fs from 'fs'
import { NextPage } from 'next'

import BlogListing from 'components/sections/blog/BlogListing'
import { FILESYSTEM } from 'consts/app'
import { BlogPostData } from 'ts/app/types'

export const getStaticProps = async () => {
  const files = fs.readdirSync(FILESYSTEM.POSTS)

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(FILESYSTEM.POSTS + fileName, 'utf-8')
    const { data, content } = matter(readFile)
    const post: BlogPostData = {
      slug,
      metadata: data as BlogPostData['metadata'],
      content,
    }
    return post
  })

  return {
    props: {
      posts,
    },
  }
}

const Blog: NextPage<{ posts: BlogPostData[] }> = ({ posts }) => (
  <Container>
    <Typography variant="h3" gutterBottom>
      Blog
    </Typography>
    {posts.length > 0 ? (
      <Grid container spacing={2}>
        {posts.map((post) => (
          <BlogListing key={post.slug} post={post} />
        ))}
      </Grid>
    ) : (
      <Typography variant="h6">Watch this space, blog posts coming soon!</Typography>
    )}
  </Container>
)

export default Blog
