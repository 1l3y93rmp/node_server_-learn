let promiseGetImg = new Promise((resolve, reject) =>{ // 這兩個參數一定要放，類似 Return 丟東西回去給then()方法
    console.log('promiseGetImg 開始跑囉')
  var img = new Image();
  img.src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92p.png' // 錯誤網址
  //img.src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' // 正確網址
  img.onload = function(){
      console.log('new Promise內成功');
    resolve(img) // 解決
  }
  img.onerror = function(){
    // 失敗了 onerror自己也會丟錯誤
    console.log('new Promise內失敗');
    reject(promiseGetImg) // 這裡沒寫的話 window.onunhandledrejection 也不會幫調用喔 想要追蹤錯誤這裡一定要寫
  }
})

console.log(promiseGetImg)
// 宣告完 new Promise 內有可立即執行的操作還是會先跑，異步操作會進入待機狀況
// 所以第一個完成的是第三行的Console
// 接下來會執行第十七行Console，同時間異步也開始
// 接下來才會跑 img.onload 結果，最後異步操作結束後才會跑 then

promiseGetImg.then(
  (resolve) =>{ // 接下來才是把一些成功或失敗的操作用 then 方法綁再一起
    // 完成
    console.log('resolve成功');
    console.log(promiseGetImg)
  }
  // ,
  // (reject) => {
  //   // 拒绝
  //   console.log('reject失敗');
  //   console.log(reject) // 這會一個<img> 的HTML TAG，只要reject 被調用或是被throw onunhandledrejection 都會跑
  //   throw 'nonononoon'; //如果這邊丟出失敗，window.onunhandledrejection會跑起來 throw 會執行的最慢
  // }
);
let rejected;
window.onunhandledrejection = function(event) {
  // reject有throw任和東西 或是根本沒有 reject()的時候 Promis失敗時這裡會被調用了
  //當一個Promise錯誤最初未被處理，(一個循環輪中)，則會觸發 onunhandledrejection 事件
  // reject有throw任和東西這裡可以接到
  console.log('window.onunhandledrejection被調用') 
  // console.log(event.type); // "unhandledrejection"
  console.log(event.reason); // 拒絕原因，通常是收到 reject throw的東西 或是 img.onerror的 reject
  // console.log(event.promise); // true
  

  promiseGetImg.catch((reject)=>{
    console.log('window.onunhandledrejection內的reject失敗');
  })
};
window.onrejectionhandled = function(event) {
  console.log('window.onrejectionhandled被調用')
  // console.log(event.type); // "unhandledrejection"
  // console.log(event.reason); // "Explosion!"
  // console.log(event.promise); // true
  // 當一個Promise錯誤最初未被處理，但是稍後又得到了處理(一個循環輪次後)，則會觸發 onrejectionhandled 事件
  // 也就是處理被拒絕後，又有人突然幫它加上了 reject 
};