const Koa = require('koa')
const app = new Koa()
const DB = require('./module/db')
app.use(async (ctx) => {

    //查询
    if (ctx.url === '/' && ctx.method === 'GET') {
        //必须加await 否则数据不会等，是空的
        let data = await DB.find('people', {})
        ctx.body = data
    }


})
app.listen(3000)
console.log('[demo] node 3000');