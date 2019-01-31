const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {

  //从request中获取GET请求
  let url = ctx.url //获取当前路径
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring



  //从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;


  ctx.body = { //页面打印内容
    url, //"url":"/?name=xiaoming&age=20"
    req_query, // 对象 :{"name":"xiaoming","age":"20"},
    req_querystring, //字符串:"name=xiaoming&age=20"

    //从上下文中直接获取
    ctx_query, //ctx_query":{"name":"xiaoming","age":"20"}
    ctx_querystring //"ctx_querystring":"name=xiaoming&age=20"
  }
})
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000');