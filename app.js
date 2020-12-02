const staticCache = require('koa-static-cache')
const convert = require('koa-convert')
const views = require('koa-views')
const registerRouter = require('./router')
const body = require('koa-better-body')
const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const errorHandle = require('./libs/error')
const logger = require('./libs/log')

app.listen(config.port, () => {
    console.log('server is running')
})

errorHandle(app)
logger(app)

let db = require('./libs/db')

app.use(async (ctx, next) => {
    ctx.db = db
    await next()
})

app.use(convert(body({
    uploadDir: config.uploadDir
})))

const render = views(config.templateDir, { map: { html: 'ejs' } })

app.use(render)

app.use(registerRouter())

app.use(staticCache(config.staticDir))