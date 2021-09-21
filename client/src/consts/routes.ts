import { FC, ReactNode } from 'react'
import { RouteProps } from 'react-router-dom'
import PlexStatus from 'components/PlexStatus'
import Login from 'components/Login'
import { Home as HomeIcon, Message as MessageIcon, Person as PersonIcon } from '@mui/icons-material'
import Posts from 'components/posts/Posts'
import Account from 'components/Account'
import Privacy from 'components/Privacy'
import Home from 'components/Home'

export type Route = {
  Component: FC
  path: string
  props?: RouteProps
  nav?: {
    name: string
    Icon?: ReactNode
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
      Icon: PersonIcon,
    },
  },
  posts: {
    Component: Posts,
    path: '/posts',
    nav: {
      name: 'Posts',
      Icon: MessageIcon,
    },
  },
  account: {
    Component: Account,
    path: '/account',
    nav: {
      name: 'Account',
      Icon: HomeIcon,
    },
  },
  privacy: {
    Component: Privacy,
    path: '/privacy',
  },
  home: {
    Component: Home,
    path: '*',
  },
}

export default routes
