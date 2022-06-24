/* eslint-disable react/no-danger */
import { FILESYSTEM } from 'consts/app'
import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { BlogPostData, Params } from 'ts/app/types'

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const files = fs.readdirSync('posts')
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostData, Params> = ({ params }) => {
  const fileName = fs.readFileSync(`${FILESYSTEM.POSTS}${params?.slug}.md`, 'utf-8')
  const { data: metadata, content } = matter(fileName)
  return {
    props: {
      metadata,
      content,
    },
  }
}

const PostPage: NextPage<BlogPostData> = ({
  metadata,
  content,
  // eslint-disable-next-line arrow-body-style
}) => {
  return (
    <div>
      <h1>{metadata.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  )
}

export default PostPage
