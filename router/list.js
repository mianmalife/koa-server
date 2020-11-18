const Router = require('koa-router')
const router = new Router()

router.get('/list', ctx => {
    ctx.body = 'list'
})

module.exports = router