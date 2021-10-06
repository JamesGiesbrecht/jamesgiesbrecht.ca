import path from 'path'

export const root = path.join(import.meta.url, '..', '..', '..')
export const publicDir = path.join(root, '..', 'client', 'build')
