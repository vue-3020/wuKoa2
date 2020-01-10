const Koa = require('koa')
const app = new Koa()

//需要获取body的插件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const DB = require('./module/db')
app.use(async (ctx) => {

  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
    <h1>插入数据库内容</h1>
    <form method="POST" action="/">
        <p>姓名</p>
        <input name="username" /><br/>
        <p>年龄</p>
        <input name="age" /><br/>
        <p>性别</p>
        <input name="sex" /><br/>
        <p>状态</p>
        <input name="status" /><br/>
        <button type="submit">提交</button>
    </form>
`;
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body;
    let data = await DB.insert('people', postData)
    //插入后的返回值
    if (data.result.ok == 1) {
      ctx.body = '插入成功'
    } else {
      ctx.body = '插入失败'
      ctx.redirect('/')
    }
  }


})
app.listen(3000)
console.log('[demo] node 3000');