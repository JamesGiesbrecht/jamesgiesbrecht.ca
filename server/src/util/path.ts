import path from 'path'

export const root = process.cwd()
export const publicDir = path.join(root, '..', 'client', 'build')
export const nextDir = path.join(root, '..', 'next-client')
