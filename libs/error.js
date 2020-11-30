module.exports = server => {
    server.use(err_handle)
}

async function err_handle(ctx, next) {
    try {
        console.log(ctx)
        await next()
    } catch (error) {
        console.log(error, '错了')
        ctx.body = error
    }
}