import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export const SERVER_SIDE_HOST = `http://localhost:${serverRuntimeConfig.SERVER_PORT}`

export const SERVER_SIDE_ROUTES = {
  PLEX_SESSIONS: '/api/plex/sessions',
  POSTS: {
    GET_POSTS: '/api/posts',
    POST_NEW_POST: '/api/posts/new',
    UPDATE_POST: (id: string) => `/api/posts/${id}`,
  },
}

export const FILESYSTEM = {
  POSTS: 'posts/',
  IMAGES: {
    ROOT: '/img/',
    PROJECTS: '/img/projects/',
    LOGOS: '/img/logos/',
  },
}
