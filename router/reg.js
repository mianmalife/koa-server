const Router = require('koa-router')
const router = new Router()

router.post('/reg', async ctx => {
    const { email, password } = ctx.request.fields
    if (email == '' || password == '') {
        ctx.throw(400, { code: 1, msg: '用户名或密码为空' })
    } else {
        ctx.status = 200
        ctx.body = { code: 0, msg: '登录成功'}
        await ctx.render('welcome', { email: email })
    }
})

module.exports = router