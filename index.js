const static = require('koa-static')
const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const registerRouter = require('./router')
const app = new Koa()
const error = require('koa-json-error')

app.use(bodyParser())
function formatError(err) {
    return {
        // Copy some attributes from
        // the original error
        status: err.status,
        msg: err.message,
 
        // ...or add some custom ones
        success: false,
        reason: 'Unexpected'
    }
}
app.use(error(formatError))
const render = views(__dirname + '/view', { map: { html: 'ejs' } })

app.use(render)

app.use(registerRouter())

app.use(static(path.join(__dirname + '/public')))

app.listen(8000, () => {
    console.log('server is running')
})