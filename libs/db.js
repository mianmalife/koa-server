const Mysql = require('mysql-pro')
const config = require('../config')

let db = new Mysql({
    mysql: {
        host: config.db_host,
        port: config.db_port,
        database: config.db_name,
        user: config.db_user,
        password: config.db_pass
    }
})

db.execute = async sql => {
    await db.startTransaction()
    let res
    if(typeof sql === 'string') {
        res = await db.executeTransaction(sql)
    }else {
        sql.forEach(async item => {
            res = await db.executeTransaction(item)
        })
    }
    await db.stopTransaction()
    return res
}

module.exports = db