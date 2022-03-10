import { useEffect } from 'react'
import { Container, Typography, Link } from '@mui/material'
import RouterLink from 'next/link'
import routes from 'consts/routes'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const Custom500: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(routes.home.path)
  }, [router])

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        500 Error
      </Typography>
      <Typography>Something went wong.</Typography>
      <RouterLink href={routes.home.path} passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link>Go back to Home</Link>
      </RouterLink>
    </Container>
  )
}

export default Custom500
