const path = require('path')

module.exports = {
    listen: 8000,
    staticDir: path.resolve('public'),
    templateDir: path.resolve('view'),
    uploadDir: path.resolve('upload')
}