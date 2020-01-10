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
    <h1>用名字匹配修改的数据，</h1>
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
    let data = await DB.update('people', {
      'username': postData.username
    }, {
      'age': postData.age,
      'sex': postData.sex,
      'status': postData.status
    })
    //插入后的返回值
    if (data.result.ok && data.result.nModified && data.result.n) {
      ctx.body = '修改成功'
      let data = await DB.find('people', {})
      ctx.body = data;
    } else {
      ctx.body = '修改失败'
      ctx.redirect('/')
    }
  }


})
app.listen(3000)
console.log('[demo] node 3000');