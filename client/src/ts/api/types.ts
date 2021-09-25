import { PostType } from 'ts/app/types'

export type GetPostsResponse = PostType[]

export type NewPostResponse = PostType

export type UpdatePostResponse = {
  message: string
  post: PostType
}

export type DeletePostResponse = {
  message: string
  deletedCount: number
}

export type GetPlexStatusResponse = {
  streams: {
    external: number
    internal: number
  }
  quality: string
  isWatching: string
  message: string
}
