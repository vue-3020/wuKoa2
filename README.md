### koa下载
```
npm init -y
npm install --save koa
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