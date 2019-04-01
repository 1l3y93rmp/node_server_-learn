// 這支檔案可以直接用 node promise.js 執行起來
var http = require('http');  // 調用Node自帶的模組"http"
var fs = require('fs'); //  調用Node自帶的模組"fs" (filesystem)，專門用來操作 (讀 寫 刪除 編輯 移動)伺服器主機上的實體檔案

fs.readFile("zzz.txt", function(err, contents) { // Callback 回調方式
  if (err) {
  throw err;
  }
  console.log(contents);
});
console.log("Hi!"); // 一樣是這邊先跑，然後才跑 zzz.txt 讀取結果 因為讀取檔案是非同步操作

// 下面 改用promise 的方法試試看
console.log(process); 

let promise = new Promise(function(resolve, reject){
  fs.readFile("zz.txt",function(err, contents) { // Callback 回調方式
    if (err) {
    reject (err);
    return
    }
    resolve(contents)
    console.log(contents);
  });
});

promise.then(function(contents) { // 接下來才是把一些撐工或失敗的操作用 then 方法綁再一起
  // 完成
  console.log(contents);
}, function(err) {
  // 拒绝
  throw err;
});

// then()的用法 可傳入兩個Function 想要 then(成功方法, 失敗方法)
// 或是 then( 成功方法 )，然後再 then( 失敗方法 ) 兩種寫法都是可以的

// promise.then(function(contents) {
//   // 完成
//   console.log(contents);
// });
// promise.then(null, function(err) {
//   // 拒绝
//   console.error(err.message);
// });


