module.exports = server => {
    server.use(err_handle)
}

async function err_handle(ctx, next) {
    try {
        await next()
    } catch (error) {
        console.log(error)
        ctx.body = { code: error.code, msg: error.msg }
    }
}