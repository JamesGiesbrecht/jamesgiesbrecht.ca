const path = require('path')

const rootDir = path.dirname(process.mainModule.filename)

exports.root = rootDir
exports.public = path.join(rootDir, '..', 'client', 'build')
