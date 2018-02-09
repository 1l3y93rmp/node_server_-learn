var http = require('http');  // 調用Node自帶的模組"http"
var fs = require('fs'); //  調用Node自帶的模組"fs"，專門用來操作 (讀 寫 刪除 編輯 移動)伺服器主機上的實體檔案
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
app.get('/', function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求
    // fs.createReadStream('./index.html').pipe(response)
    // createReadStream創造閱讀流，指向一個檔案來讀取，然後這件事情實際上是response(回應) 時候發生的，所以用pipe把他綁回去
    // 使用流的好處是 它是一點一點的處理的，可以使用在很大的檔案上 影片 音樂上而不會把佔存弄爆炸


    // 另外一個方法是 fs.readFil 單純的讀取(一口氣讀完) 一般來說TXT的檔案可以使用這個方法
    // fs.readFil是一個非同步動作
    fs.readFile('output.txt', 'UTF8', function (error, data) {
      if (error) throw err;
      response.send(data); // 如果回覆一個data 然後它原本就是一個檔案... 它會變成用下載的 (如果是字串就直接把字串印出來)
    })



});

app.get('/writer', function(request, response){ //我們要處理URL為 "/writer" 的HTTP GET請求

    fs.writeFile('output.txt', '\n文件已存在，并追加内容 -- '+(new Date()-0), {
      flag: 'a'
    });


    
/*
    var oldtext = ''
    fs.readFile('output.txt', 'UTF8', function (error, data) {
      if (error) throw err;
      oldtext = data
      console.log(data)
    })
    var writerStream = fs.createWriteStream('output.txt'); // 先宣告了一下這動做
    writerStream.write(oldtext + '當/writer被訪問的時候，這句話會被寫到output.txt裏面歐','UTF8');// 詳細的UTF8設定
    writerStream.end(); //綁上end事件(當沒有更多數據的時候)
    writerStream.on('finish', function() { // 使用ON 來綁定finish事件， 假如所有資料已被寫入到底層系統(finish) 就執行console
      console.log('寫入完成');
    });

    writerStream.on('error', function(error) { // 使用ON 來綁定error事件， 假如所有資料已被寫入到底層系統(finish) 就執行console
      console.log(error.stack);
    });
    // createWriteStream創造寫入流，指向一個output.txt，並宣告為變數 這樣就可以用on來綁上事件囉
*/
    response.send('<h1>歡迎造訪writer頁面</h1>');

});


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

server.listen(9999,'192.168.19.105',function(){
  console.log('HTTP伺服器在 http://192.168.19.105:9999/ 上運行~');
}); // 設訂一下這個伺服器在什麼位置上