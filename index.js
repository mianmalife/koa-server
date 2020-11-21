const static = require('koa-static')
const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const registerRouter = require('./router')
const app = new Koa()

app.use(bodyParser())

const render = views(__dirname + '/view', { map: { html: 'ejs' } })

app.use(render)

app.use(registerRouter())

app.use(static(path.join(__dirname + '/public')))

app.listen(8000, () => {
    console.log('server is running')
})