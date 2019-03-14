var http = require('http');  // 調用Node自帶的模組"http"
var fs = require('fs'); //  調用Node自帶的模組"fs" (filesystem)，專門用來操作 (讀 寫 刪除 編輯 移動)伺服器主機上的實體檔案
var express = require('express'); // 這是一個模塊，類似Rotor
var app = express();
var server = http.createServer(app);
// http.createServer創建伺服器囉
// 括號內就是放這創建伺服器後的事件

/*var handleRequest = function(request, response){
  response.end("Hello Node.js~");
}*/
// 宣告一個方法，當這個伺服器被HTTP請求了，要做什麼處理 回應什麼東東
// 這個方法有兩個參數 request表示是使用者來的請求
// response則是伺服器的回應
// 在上面 response 直接回應一個字串



// 設定app裏面的方法
// app.get('/', function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求
//     fs.createReadStream('./A.gif').pipe(response)
//     // createReadStream創造閱讀流，指向一個檔案來讀取，然後這件事情實際上是response(回應) 時候發生的，所以用pipe把他綁回去
//     // 使用流的好處是 它是一點一點的處理的，可以使用在很大的檔案上 影片 音樂上而不會把佔存弄爆炸

//     console.log(process.cwd()) // process.cwd() 可以得到相對路徑(指到執行node的那一層)

//     /**/
//     // fs.readFil 單純的讀取(一口氣讀完) 一般來說TXT的檔案可以使用這個方法
//     // fs.readFil()是一個非同步動作， fs.readFileSync()則是同步 小心造成塞車
//     fs.readFile('A.gif', function (error, data) {
//       if (error) throw err; // throw 扔出的意思，拋出錯誤也會使整個node停止下來
//       //response.send(data); // 如果回覆一個data 然後它原本是一個二進制檔案... 它會變成用下載的 (如果是字串就直接把字串印出來)
//       console.log(data) // 可以看到它回應了一個 Buffer 物件 (圖片/音樂/影片...二進制等檔案會用此方式呈現出來 文字檔以外的檔案多是二進制)
//       console.log("是否Buffer物件？", Buffer.isBuffer(data));
//       console.log("Buffer大小：", data.length); // buf.length這是一件Buffer物件的大小，注意這不一定是資料的總長度，只是代表了Buffer在記憶體中的總大小。
//       // 可以用slice(分割反回新的) write(把資料寫入特定的位置)等等操作操作data 的 Buffer二進制碼
//     })
// });

app.get('/',function(request, response){
  fs.createReadStream('./index.html').pipe(response)
})

app.get('/recording', function(request, response){
  var time = (new Date).getFullYear()+'/'+(new Date).getMonth()+'/'+(new Date).getDate()+'/'+(new Date).getHours()+':'+(new Date).getMinutes()+':'+(new Date).getSeconds()
  response.send('這個頁面會記錄伺服器回應的紀錄'+time)
  fs.writeFile(process.cwd()+'/recording/recording.txt', '造訪的時間是 -- '+ time + '\r\n', {
    encoding: 'utf8',
    flag: 'a' // 模式a 追加內容 ， 模式w 覆蓋寫入
  }, function(err){ // callback 涵式
    if(err) throw err;
    console.log('寫入了~');
  });
  // fs.writeFile() 自己會判斷該路徑有無存在檔案，如果沒有它會自己新建一個文件 不會跳錯誤(不論模式a或w)
  // 注意 fs.writeFile()一樣有fs.writeFileSync版本 如果同時多人寫入使用fs.writeFileSync()較佳
  // fs.writeFileSync 沒有 callback可以用...
})


app.get('/writer', function(request, response){ //用createWriteStream(寫入流)執行一樣的操作

    var writerStream = fs.createWriteStream('zz.txt', {flags: 'a'})
    writerStream.write('當/writer被訪問的時候，這句話會被寫到zz.txt裏面歐\r\n','UTF8');// 詳細的UTF8設定
    writerStream.end(); //綁上end事件(當沒有更多數據的時候) 結束這個工作流

    writerStream.on('finish', function() { // 使用ON 來綁定finish事件， 假如所有資料已被寫入到底層系統(finish) 就執行console
      console.log('寫入完成');
    });
    writerStream.on('error', function(error) { // 使用ON 來綁定error事件
      console.log(error.stack);
    });

    // createWriteStream創造寫入流，指向一個output.txt，並宣告為變數 這樣就可以用on來綁上事件囉
    response.send('<h1>歡迎造訪writer頁面</h1>');

});


app.get('/unlink', function(request, response){
  fs.stat('zzz.txt', (err, stats) => {
    if (err) throw err;
    console.log('文件属性: ${JSON.stringify(stats)}');
  });
  /*fs.unlink('zzz.txt', (err) => { // fs.unlink 刪除的意思，也有fs.unlinkSync() 同步的選擇
    if (err) throw err;
    console.log('成功刪除 zzz.txt');
    // 註: 如果一邊rename重新命名 一邊刪(或讀取) 這時候就要用同步會安全
  });*/


  response.send('這個頁面會刪除 zzz.txt檔案')
})




app.get('/post/:id',function(request, response){
    // response.end('Hello & hi'); //作出回應
    response.send(request.params.id); // 可以回應各種網址參數
    // 可以回傳 Send 指 回傳字串至<body>內
});

app.get('/myapi/:love',function(request, response){ 
    response.json({
      id: request.params.love
      });
    // 可以回應JSON~(就跟MocoAPI一樣)
});

app.get('/query',function(request, response){ 
  response.json(request.query); // 回應網址 ? 後面的參數，並使用json整理好喔
});

server.listen(9999,function(){
  console.log('HTTP伺服器在 http://localhost:9999/ 上運行~');
}); // 設訂一下這個伺服器在什麼位置上