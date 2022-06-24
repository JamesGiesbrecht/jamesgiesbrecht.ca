import { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import ROUTES from 'consts/routes'

export const Custom404: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(ROUTES.home.path)
  }, [router])

  return null
}

export default Custom404
