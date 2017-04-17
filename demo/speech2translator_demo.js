/*jshint esversion: 6 */
let speechToTextStream = require('../speech2text.js');
let languageTranslator = require('../languageTranslator.js');
// let languageTranslator = require('../baiduLanguageTranslator.js');
let through2 = require('through2');
let ws = require("nodejs-websocket");
let text = '';

let stream = through2({ objectMode: true }, function(chunk, enc, callback) {
    let string = chunk.toString()
    let result = string.replace(/\n/, '').toUpperCase().split(/[ \t]/)

    this.push(result)
    callback();
});

let server = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(3000);

stream.on('data', function(data) {
    text += data.join(' ');
    languageTranslator.translator(text, function(translatedText){
      console.info(translatedText);
      server.connections.forEach(function (connection) {
        connection.sendText(text + '\r\n' + translatedText);
      });
    });
});

speechToTextStream.stream.pipe(stream);
