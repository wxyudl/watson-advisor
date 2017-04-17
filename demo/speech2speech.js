/*jshint esversion: 6 */
let speechToTextStream = require('../speech2text.js');
//let languageTranslator = require('../languageTranslator.js');
//let languageTranslator = require('../baiduLanguageTranslator.js');
let conversation = require('../conversation.js');
let through2 = require('through2');
let ws = require("nodejs-websocket");
let GPIO = require('../GPIO_light.js');
let t2s = require('../text2speech.js');
let text = '';

let stream = through2({ objectMode: true }, function(chunk, enc, callback) {
    let string = chunk.toString()
    let result = string.replace(/\n/, '').toUpperCase().split(/[ \t]/)

    this.push(result);
    callback();
});

let server = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(3000);

//set up serInternal starts to run
GPIO.initLED(300);

stream.on('data', function(data) {
    console.log('End speech to text.');
    GPIO.modeKey.mode = 'flow';
    
    text = data.join(' ');
//    languageTranslator.translator(text, function(translatedText){
//      console.info(translatedText);
//
//      conversation.conversation(translatedText, function(msg){
//        console.info(msg);
//        server.connections.forEach(function (connection) {
//          connection.sendText(text + ' --- ' + translatedText + ' --- ' + msg);
//        });
//      })
//    });
    
    conversation.conversation(text, function(msg, _node, _entity){
        console.info(msg, _node);
        
        server.connections.forEach(function (connection) {
            connection.sendText(text + ' --- ' + msg);
            GPIO.modeKey.mode = 'blink';
            
            console.log('t2s.isSpeaking', t2s.isSpeaking);
            !t2s.isSpeaking && t2s.runSpeech(msg[0]);
        });
    })
});

speechToTextStream.stream.pipe(stream);