const Router = require('koa-router')
const router = new Router()

router.post('/reg', async ctx => {
    console.log(ctx.request.body)
    const { name } = ctx.request.body
    await ctx.render('welcome', { username: name })
})

module.exports = router