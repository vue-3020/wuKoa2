### koa下载
```
npm init -y
npm install --save koa
```
### 启动项目  index.js是文件名
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
### post 获取参数  @3是版本
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