//async 声明一个异步方法
//await 等待一个异步方法完成
function box() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('三秒后出现内容')
    }, 3000)
  })
}
//等待box 执行完
async function test() {
  const v = await box()
  console.log(v);
}
test();