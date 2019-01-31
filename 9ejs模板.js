const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()


// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = '使用koa2模板'
  let content = '这是的内容使我们自己写的要保存'
  await ctx.render('index', {
    title,
    content
  })
})
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
})