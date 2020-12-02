const path = require('path')

module.exports = {
    port: 8000,
    staticDir: path.resolve('public'),
    templateDir: path.resolve('view'),
    uploadDir: path.resolve('public/upload'),
    logDir: path.resolve('log/access.log'),
    // database
    db_host: 'localhost',
    db_port: 3306,
    db_user: 'root',
    db_name: 'tomexam',
    db_pass: '123456'
}