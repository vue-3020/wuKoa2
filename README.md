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
### post 获取参数
```
query和querystring区别

```