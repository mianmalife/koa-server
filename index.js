const staticCache = require('koa-static-cache')
const path = require('path')
const Koa = require('koa')
// const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const views = require('koa-views')
const registerRouter = require('./router')
const app = new Koa()
const body = require('koa-better-body')
const config = require('./lib/config')

app.use(convert(body({
    uploadDir: config.uploadDir
})))

app.use(async (ctx, next) => {
    console.log(ctx.request.fields)
    await next()
})
const render = views(config.templateDir, { map: { html: 'ejs' } })

app.use(render)

app.use(registerRouter())

app.use(staticCache(config.staticDir))

app.listen(config.listen, () => {
    console.log('server is running')
})