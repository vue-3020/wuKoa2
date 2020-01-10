const Koa = require('koa')
const app = new Koa()

//需要获取body的插件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const DB = require('./module/db')
app.use(async (ctx) => {

  if (ctx.url === '/' && ctx.method === 'GET') {
    let data = await DB.find('people', {})
    let html = `
    <p>${JSON.stringify(data)}</p>
    <h1>通过名字删除数据</h1>
    <form method="POST" action="/">
        <p>姓名</p>
        <input name="username" /><br/>
        <button type="submit">提交</button>
    </form>
`;
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body;
    let data = await DB.remove('people', {
      'username': postData.username
    })
    //插入后的返回值
    if (data.result.ok && data.result.n) {
      let data = await DB.find('people', {})
      ctx.body = data;
    } else {
      ctx.redirect('/')
    }
  }


})
app.listen(3000)
console.log('[demo] node 3000');