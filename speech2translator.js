let fs = require('fs');
let http = require('http');
let chokidar = require("chokidar");
var through2 = require('through2');
let Mic = require('node-microphone');
let ws = require("nodejs-websocket");
let watson = require('watson-developer-cloud');
let SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
let mic = new Mic();
let micStream = mic.startRecording();
var text = '';
var translatedText = '';

let speechToText = new SpeechToTextV1({
  username: '768b5ec4-edc2-4ec7-91a7-dba43055a8fa',
  password: 'cVmzXgBiKV17'
});

let languageTranslator = watson.language_translator({
  "url": "https://gateway.watsonplatform.net/language-translator/api",
  "password": "n4gmdEnBRacA",
  "username": "eb9c1636-0097-44ae-96f4-8e23da4533f8",
  "version": "v2"
});

let speechToTextStream = speechToText.createRecognizeStream({
  model: 'zh-CN_BroadbandModel',
  Content_type: 'audio/ogg;codecs=opus; rate=48000; channels=1',
  continuous: true
});

var stream = through2({ objectMode: true }, function(chunk, enc, callback) {
    var string = chunk.toString()
    var result = string.replace(/\n/, '').toUpperCase().split(/[ \t]/)

    this.push(result)
    callback()
});

//http.createServer(function(req, res){
// res.writeHead(200, {'Content-type' : 'text/text'});
// res.write(translatedText);
// res.end();
//}).listen(3000);

var server = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(3000);

stream.on('data', function(data) {
    text += data.join(' ');
    console.log(text);
    languageTranslator.translate({
      model_id: 'zh-en-patent',
      text: text,
    }, function(err, translation) {
      if (err){
        console.log(err)
      }else{
        translatedText = translation.translations[0].translation;
        console.log(translation.translations[0].translation);
        server.connections.forEach(function (connection) {
          connection.sendText(text + '\r\n' + translatedText);
        });
      }
    });
});

micStream.pipe(speechToTextStream).pipe(stream);
