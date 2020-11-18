const Router = require('koa-router')
const router = new Router()

router.get('/', async ctx => {
    await ctx.render('index', { title: 'koa'})
})
router.get('/user/:id', ctx => {
    ctx.body = `Welcome ${ctx.params.id}`
})

module.exports = router