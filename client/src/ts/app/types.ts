import { ReactNode } from 'react'

export type Tech = {
  name: string
  logo: string
  color: string
  fontColor: string
}

type ProjectSection = {
  title: string
  content: (string | ReactNode)[]
}

export type ProjectLinkButton = {
  name: string
  icon: ReactNode
  link?: string
  items?: ProjectLinkButton[]
}

export type Project = {
  name: string
  hidden?: boolean
  summary: string
  description: ProjectSection[]
  image: string
  background: string
  buttons: ProjectLinkButton[]
  stack: Tech[]
}
