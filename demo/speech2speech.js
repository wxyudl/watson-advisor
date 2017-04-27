/*jshint esversion: 6 */
let speechToTextStream = require('../speech2text.js');
//let languageTranslator = require('../languageTranslator.js');
//let languageTranslator = require('../baiduLanguageTranslator.js');
let conversation = require('../conversation.js');
let alchemyDataNews = require('../alchemyDataNews.js');
let visualRecognition = require('../cameraRecognition.js');
let toneAnalyzer = require('../toneAnalyzer.js');
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
GPIO.startBreathLED(10);

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
            connection.sendText('Me: '+ text + ' -> Watson: ' + msg);
            GPIO.modeKey.mode = 'blink';
            
            !t2s.isSpeaking.status && t2s.runSpeech(msg[0], function(){
                // @todo: added
                if(_node === 'news-frequency-ok' && _entity === 'news_frequency'){
                    alchemyDataNews.alchemyDataNews('now-1d', 'IBM', function(data){
                        console.log('新闻结果:', data);
                        if(data.status === 'OK'){
                            let preText = 'Here is what I got the news, ';
                            let newsResult = preText + data.result.docs[0].source.enriched.url.text;
                            connection.sendText('News result: ', newsResult);
                            !t2s.isSpeaking.status && t2s.runSpeech(newsResult, function(){});
                        }
                    });
                }else if(_node === 'capability-visualization-start'){
                    visualRecognition.analysis(function(data){
                        if(data){
                            console.log('图像识别结果:', data);
                            console.log('How do you feel my answer?');
                            toneAnalyzer.toneAnalyzer(text, function(data){
                                console.log('语气结果:', data);
                            });
                        }else{
                            return false;
                        }
                    });
                    return false;
                }else{
                    
                } 
            });
        });
    })
});

speechToTextStream.stream.pipe(stream);