import path from 'path'
// FIXME
// @ts-ignore
export const root = path.dirname(process.mainModule.filename)
export const publicDir = path.join(root, '..', 'client', 'build')
