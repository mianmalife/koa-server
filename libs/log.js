const fs = require('fs')
const config = require('../config')

module.exports = server => {
    server.use(logger)
}

async function logger(ctx, next) {
    await new Promise((resolve, reject) => {
        fs.appendFile(config.logDir, `[${Date.now()}];${ctx.method};${ctx.url}\r\n`, err => {
            resolve()
        })
    })
    await next()
}