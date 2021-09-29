import { FC, ReactNode } from 'react'
import { Home as HomeIcon, Message as MessageIcon, Person as PersonIcon } from '@mui/icons-material'
import { RouteProps } from 'react-router-dom'

import Account from 'components/Account'
import Home from 'components/Home'
import PlexStatus from 'components/PlexStatus'
import Login from 'components/Login'
import Posts from 'components/posts/Posts'
import Privacy from 'components/Privacy'

export type Route = {
  Component: FC
  path: string
  props?: RouteProps
  nav?: {
    name: string
    icon?: ReactNode
  }
}

const routes: { [name: string]: Route } = {
  plex: {
    Component: PlexStatus,
    path: '/plex',
  },
  login: {
    Component: Login,
    path: '/login',
    nav: {
      name: 'Login',
      icon: <PersonIcon />,
    },
  },
  posts: {
    Component: Posts,
    path: '/posts',
    nav: {
      name: 'Posts',
      icon: <MessageIcon />,
    },
  },
  account: {
    Component: Account,
    path: '/account',
    nav: {
      name: 'Account',
      icon: <PersonIcon />,
    },
  },
  privacy: {
    Component: Privacy,
    path: '/privacy',
  },
  home: {
    Component: Home,
    path: '/',
    nav: {
      name: 'Home',
      icon: <HomeIcon />,
    },
  },
  default: {
    Component: Home,
    path: '*',
  },
}

export default routes
