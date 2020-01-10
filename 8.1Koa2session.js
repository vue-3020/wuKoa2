//session 在服务器端生成一个 key value的存储，
//他会把key返回给客户端（浏览器） 存在cookie中
// 再次访问浏览器的时候 浏览器会带着 key 去访问服务器

const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const session = require("koa-session");

app.keys = ["some secret hurr"]; //cookie的签名
const CONFIG = {
  key: "koa:sess", //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 24小时 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: true //(boolean) 会话快过期时续订会话  ,
};
app.use(session(CONFIG, app));

router
  .get("/", function(ctx) {
    //设置session
    ctx.session.usernfo = "这是一个session， 存在服务器端";
    ctx.body =
      '<a href="http://localhost:3000/todo">设置成功 访问  http://localhost:3000/todo 查看内容</a> ';
  })
  .get("/todo", ctx => {
    //获取session
    console.log(ctx.session.usernfo);
    ctx.body = ctx.session.usernfo;
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("starting at port 3000");
});
