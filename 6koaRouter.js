const Koa = require('koa');
//路由组件
const Router = require('koa-router');
const app = new Koa();


//不增加层级 http://127.0.0.1:3000/todo
// const router = new Router();

//增加层级  http://127.0.0.1:3000/wu/todo
const router = new Router({
  prefix:'/wu'
})

//多页面配置
router.get('/', function (ctx, next) {
  ctx.body="需要显示的内容";
}).get('/todo',(ctx,next)=>{
  ctx.body="Todo page"
});

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('starting at port 3000');
})