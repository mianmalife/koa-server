const staticCache = require('koa-static-cache')
const Koa = require('koa')
const convert = require('koa-convert')
const views = require('koa-views')
const registerRouter = require('./router')
const app = new Koa()
const body = require('koa-better-body')
const config = require('./config')
const errorHandle = require('./libs/error')

app.use(convert(body({
    uploadDir: config.uploadDir
})))

let db = require('./libs/db')

errorHandle(app)

app.use(async (ctx, next) => {
    ctx.db = db
    await next()
})
const render = views(config.templateDir, { map: { html: 'ejs' } })

app.use(render)

app.use(registerRouter())

app.use(staticCache(config.staticDir))

app.listen(config.port, () => {
    console.log('server is running')
})