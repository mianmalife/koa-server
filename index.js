const serve = require('koa-static')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const app = new Koa()

//设置cookie签名
app.keys = ['i am zhangkx']
// x-response-time
app.use(async (ctx, next) => {
    ctx.cookies.set('name', 'kaka', { signed: true})
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-response-time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method},${ctx.url} - ${ms}ms`)
})

// app.use(async ctx => {
//     ctx.body = 'hello koa'
// })

router.get('/', (ctx, next) => {
    ctx.body = 'hello, koa'
})
router.get('/getList', (ctx, next) => {
    ctx.body = 'hello, list'
})
console.log(app.env) // development

app.use(serve(path.join(__dirname + '/public')))

app.use(router.routes()).use(router.allowedMethods())
app.listen(8000, () => {
    console.log('server is running')
})