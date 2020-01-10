const MongoClient = require("mongodb").MongoClient;
const Config = require("./config");

class Db {
  //单利模式，值声明一次实例
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance;
  }
  constructor() {
    //1 解决:多次实例化 实例不共享的问题
    this.dbClient = ""; /*属性 放db对象*/

    this.connect(); /*页面实例化就连接数据库*/
  }
  //连接数据库
  connect() {
    let _this = this;
    return new Promise(function (resolve, reject) {
      //2 解决数据库多次连接的问题
      if (!_this.dbClient) {
        MongoClient.connect(
          Config.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          },
          function (err, client) {
            if (err) {
              reject(err);
              //   return;
            } else {
              //数据库的名字
              var db = client.db(Config.DB_NAME);
              _this.dbClient = db;
              resolve(_this.dbClient);
            }
          }
        );
      } else {
        // 有值之后就不用重复声明实例
        resolve(_this.dbClient);
      }
    });
  }

  //查询数据库
  find(collectionName, json) {
    //用promise改成同步方法
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        //collectionName 表名字
        //json 参数
        var result = db.collection(collectionName).find(json);
        result.toArray(function (err, docs) {
          if (err) {
            reject(err);
            return;
          } else {
            resolve(docs);
          }
        });
      });
    });
  }
  //修改
  update(collectionName, parameter, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        // 表名    json要更新的数据  parameter查询条件
        db.collection(collectionName).updateOne(parameter, {
          $set: json
        }, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  //插入 collectionName 表名字, json 数据名字
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  //删除
  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).removeOne(json, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
}
// var myDb = Db.getInstance();

// myDb.find("people", {}).then(function(data) {
//   console.log(`第一个`,data);
// });


// var myDb2 = Db.getInstance();
// myDb2.find("people", {}).then(function(data) {
//   console.log(`第二个`,data);
// });

//启动项目 路径 PS D:\1项目资料\Koa2_原生\12mongodb\module> node db.js

//在外面操作数据库，起find.js中
module.exports = Db.getInstance()