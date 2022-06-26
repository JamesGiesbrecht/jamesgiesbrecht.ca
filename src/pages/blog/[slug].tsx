import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { FILESYSTEM } from 'consts/app'
import routes from 'consts/routes'
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
  const slug = params?.slug
  if (slug) {
    const fileName = fs.readFileSync(`${FILESYSTEM.POSTS}${params?.slug}.md`, 'utf-8')
    const { data: metadata, content } = matter(fileName)
    const postData: BlogPostData = {
      slug,
      metadata: metadata as BlogPostData['metadata'],
      content,
    }
    return {
      props: postData,
    }
  }
  throw new Error('No blog post found for slug')
}

const PostPage: NextPage<BlogPostData> = ({
  metadata,
  content,
  // eslint-disable-next-line arrow-body-style
}) => {
  const router = useRouter()

  if (!metadata || !content) {
    router.push(routes.blog.path)
    return null
  }

  return (
    <div>
      <h1>{metadata.title}</h1>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  )
}

export default PostPage
