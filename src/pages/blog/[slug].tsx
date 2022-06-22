/* eslint-disable react/no-danger */
import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'

export async function getStaticPaths() {
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

export async function getStaticProps({ params: { slug } }: any) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8')
  const { data: frontMatter, content } = matter(fileName)
  return {
    props: {
      frontMatter,
      content,
    },
  }
}

export default function PostPage({ frontMatter, content }: any) {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  )
}
