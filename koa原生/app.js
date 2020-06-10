const Koa = require('koa')
//设置路径
const path = require('path')
//读写模块
const fs = require('fs')
//路由组件
const Router = require('koa-router');
const router = new Router();

const app = new Koa();

let datas = [{
    id: 1,
    name: '刘备',
    age: 35
  },
  {
    id: 2,
    name: '曹操',
    age: 34
  },
  {
    id: 3,
    name: '孙权',
    age: 25
  },
  {
    id: 4,
    name: '孙策',
    age: 66
  },
  {
    id: 5,
    name: '关羽',
    age: 38
  },
  {
    id: 6,
    name: '刘伯温',
    age: 58
  },
  {
    id: 7,
    name: '成吉思汗',
    age: 78
  },
  {
    id: 8,
    name: '康熙',
    age: 88
  },
  {
    id: 9,
    name: '韩信',
    age: 45
  },
  {
    id: 10,
    name: '诸葛亮',
    age: 34
  },
]

//静态文件
const static = require('koa-static') //存放静态文件中间件
const staticPath = './static' //存放位置
app.use(static(
  path.join(__dirname, staticPath)
))


app.use(async (ctx) => {
  //如果有index.html页面加载就会变成 /1
  if (ctx.url === '/todo' && ctx.method === 'GET') {
    ctx.body = {
      code: 0,
      data: datas
    }
  }

})

//这样也可以引入
// router.get('/', function (ctx, next) {
//   let content = fs.readFileSync('./static/index.html');
//   ctx.body = content.toString()
// })

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000)
console.log('node app.js 3000');