import { ReactNode } from 'react'
import { Home as HomeIcon, Message as MessageIcon, Person as PersonIcon } from '@mui/icons-material'

export type Route = {
  path: string
  nav?: {
    name: string
    icon?: ReactNode
  }
}

type Routes = {
  plex: Route
  login: Route
  posts: Route
  // account: Route
  privacy: Route
  home: Route
}

const routes: Routes = {
  plex: {
    path: '/plex',
  },
  login: {
    path: '/login',
    nav: {
      name: 'Login',
      icon: <PersonIcon />,
    },
  },
  posts: {
    path: '/posts',
    nav: {
      name: 'Posts',
      icon: <MessageIcon />,
    },
  },
  // account: {
  //   path: '/account',
  //   nav: {
  //     name: 'Account',
  //     icon: <PersonIcon />,
  //   },
  // },
  privacy: {
    path: '/privacy',
  },
  home: {
    path: '/',
    nav: {
      name: 'Home',
      icon: <HomeIcon />,
    },
  },
}

export default routes
