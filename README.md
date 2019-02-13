### koa下载
```
npm init -y
npm install --save koa
```
### 启动项目 文件夹跟目录下新建index.js是文件名，在index.js中写代码
```
node index.js
```

### koa应用
```
const  Koa = require('koa')
const app = new Koa()

app.use(async (ctx)=>{
  ctx.body ='我的项目'
})
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000');
```
### 通过Get请求，获取url路径
* query：返回的是格式化好的参数对象。
* querystring：返回的是请求字符串。
```
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx)=>{
  let url = ctx.url //获取路径
  let request = ctx.request //获取参数
  let req_query = request.query //获取 参数对象形式
  let req_querystring = request.querystring //获取参数字符串形式

  ctx.body ={ //打印在body
    url,
    req_query,
    req_querystring
  }
})
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});
```

### post 获取参数  @3是版本
* ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单
* ctx.req:是context提供的node.js原生HTTP请求对象

```
npm install --save koa-bodyparser@3
//引入
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
```
### 路由
```
npm install --save koa-router
```
### ejs模板
```
cnpm install --save koa-views
npm install --save ejs
```

### 存放静态文件中间件
```
npm install --save koa-static
```