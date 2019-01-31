const Koa = require('koa')
const path = require('path')
const static = require('koa-static') //存放静态文件中间件
const app = new Koa()


const staticPath = './static' //存放位置
app.use(static(
  path.join( __dirname,  staticPath)
))

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

//http://127.0.0.1:3000/k.jpg 

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})
