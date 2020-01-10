const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

let home = new Router();
// http://127.0.0.1:3000/home/index
home.get('/index', async (ctx) => {
  ctx.body = 'index页面'
}).get('/todo', async (ctx) => {
  ctx.body = 'todo'
})


let page = new Router();
//http://127.0.0.1:3000/page/box
page.get('/box', async (ctx) => {
  ctx.body = 'box页面'
}).get('/404', async (ctx) => {
  ctx.body = '404'
}).get('/chuancan', async (ctx) => {
//传递参数 http://127.0.0.1:3000/page/chuancan?name=xiaoming&age=20
  ctx.body = ctx.query
})

//装载所有子页面
let router = new Router()
router.use('/home', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())


//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
});