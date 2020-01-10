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
