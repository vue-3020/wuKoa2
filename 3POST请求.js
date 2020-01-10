const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
  //判断当前登录的页面
  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
    <h1>提交POST请求<h1>
    <form method='POST' action='/'>
      <p>userName</p>
      <input name='userName' />
      <br />
      <p>age</p>
      <input name='age' />
      <br />
      <p>webSite</p>
      <input name='webSite' />
      <br />
      <button type="submit">submit</button>
    </form>
    `
    ctx.body = html;
    //发起post请求的时候
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    //将数据输出到页面
    let pastData = await parsePostData(ctx);
    ctx.body = pastData; //结果 
  } else {
    ctx.body = '<h1>404!</h1>';
  }

})

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    //判断传过来的参数是否有效
    try {
      let postdata = ''
      //拼接数据
      ctx.req.on('data', (data) => {
        postdata += data
      })
      //拼接完成
      ctx.req.addListener('end', function () {
        //成功执行
        let parseData = parseQueryStr(postdata)
        resolve(parseData);
      })
    } catch (error) {
      //失败执行
      reject(error)
    }
  })
}
//将等到的字符串转化为对象
// userName=13520326071&age=1111&webSite=111
// 修改后的结果{"userName":"eee","age":"eee","webSite":"eee"}
function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split("&")
  //.entries() entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
  for (const [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    //decodeURIComponent  URI 进行解码 为了不乱码
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData
}
app.listen(3002)
console.log('[demo] start-quick is starting at port 3002');