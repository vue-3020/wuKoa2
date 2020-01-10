### koa 下载

```
npm init -y
npm install --save koa
```

### 启动项目 文件夹跟目录下新建 index.js 是文件名，在 index.js 中写代码

```
node 1get.js
```

### koa 应用

```
const  Koa = require('koa')
const app = new Koa()

app.use(async (ctx)=>{
  ctx.body ='我的项目'
})
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000');
```

### 通过 Get 请求，获取 url 路径

- query：返回的是格式化好的参数对象。
- querystring：返回的是请求字符串。

```
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx)=>{
  let url = ctx.url //获取路径
  let request = ctx.request //获取参数
  let req_query = request.query //获取 参数对象形式
  let req_querystring = request.querystring //获取参数字符串形式

  ctx.body ={ //打印在body
    url,
    req_query,
    req_querystring
  }
})
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});
```

### post 获取参数 @3 是版本

- ctx.request:是 Koa2 中 context 经过封装的请求对象，它用起来更直观和简单
- ctx.req:是 context 提供的 node.js 原生 HTTP 请求对象

```
npm install --save koa-bodyparser@3
//引入
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
```

### cookie

- domain：写入 cookie 所在的域名
- path：写入 cookie 所在的路径
- maxAge：Cookie 最大有效时长
- expires：cookie 失效时间
- httpOnly:是否只用 http 请求中获得
- overwirte：是否允许重写

```
//写入cookie
ctx.cookies.set(
  'MyName',
  'bunengshizhongwen', {
    domain: '127.0.0.1', // 写cookie所在的域名
    path: '/index', // 写cookie所在的路径
    maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
    expires: new Date('2019-2-31'), // cookie失效时间
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: false // 是否允许重写
  }
)
// 读取cookie
ctx.body = ctx.cookies.get('MyName');
```

## session 读取 存储

```
npm install  koa-session --save
//引入
const session =require('koa-session)
```

### 路由

```
npm install --save koa-router

const Router = require('koa-router');

let home = new Router();
// http://127.0.0.1:3000/home/index
home.get('/index', async (ctx) => {
  ctx.body = 'index页面'
}).get('/todo', async (ctx) => {
  ctx.body = 'todo'
})


let page = new Router();
//http://127.0.0.1:3000/page/box
page.get('/box', async (ctx) => {
  ctx.body = 'box页面'
}).get('/404', async (ctx) => {
  ctx.body = '404'
}).get('/chuancan', async (ctx) => {
//传递参数 http://127.0.0.1:3000/page/chuancan?name=xiaoming&age=20
  ctx.body = ctx.query
})

//装载所有子页面
let router = new Router()
router.use('/home', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())


//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

```

### ejs 模板

```
cnpm install --save koa-views
npm install --save ejs
```

### 存放静态文件中间件

```
npm install --save koa-static

引入
const static = require('koa-static') //存放静态文件中间件
const staticPath = './static' //存放位置
app.use(static(
  path.join( __dirname,  staticPath)
))

app.use( async ( ctx ) => {
  ctx.body = '<img src="http://127.0.0.1:3000/k.jpg "/>'
})
```

## 安装 数据库

```
 cnpm install mongodb --save

//引入页面
const MongoClient = require("mongodb").MongoClient;

//定义数据库地址
var DB_URL = `mongodb://127.0.0.1:27017/`;


var writeData = function(db, callback) {
  //数据库名字
  var dbo = db.db("koa_user_data");
  var data = { username: "张三", age: 18, sex: "男", status: "1" };
  //插入的表名字
  dbo.collection("people").insertOne(data, function(error, result) {
    if (error) {
      console.log("错误：" + error);
      return;
    }
    callback(result);
  });
};

//连接数据库
MongoClient.connect(DB_URL, function(err, db) {
  if (err) {
    console.log(err);
    return;
  }
  //连接成功
  writeData(db, function(result) {
    console.log(result);
    db.close();
  });
});

```
执行  自定插入
```
node 11mongdb.js  
```

# 代码模块化 模块分级

koa 脚手架生成项目
```
//全局安装
cnpm install koa-generator -g

//创建项目
koa koa_test

//进入项目
cd koa_test

//下载依赖
cnpm install
```
