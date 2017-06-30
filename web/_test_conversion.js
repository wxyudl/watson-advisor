/*jshint esversion: 6 */
let conversation = require('../conversation.js');
let alchemyDataNews = require('../alchemyDataNews.js');
let visualRecognition = require('./cameraRecognition.js');
let toneAnalyzer = require('../toneAnalyzer.js');
let languageTranslator = require('./languageTranslator.js');
//let GPIO = require('../GPIO_light.js');
let t2s = require('../text2speech.js');
let RR = require('../rr.js');
var newsKeyword = '';
let ws = require("nodejs-websocket");

// News
var text1 = [
    'Hello, Watson',
    'How can you help me?',
    'Tell me some news',
    'IBM',
    'It is a company',
    'good',
    'baidu', // 测试不识别
    'yes',   // 测试不识别
    'technology',
    'Last week'
]

var text2 =  [
    'Hello, Watson', // 第二轮, 图像识别，[James]
    'what else you can do?',
    'Can you take a picture?',
    'Very good',
    '#TONERESULT#' 
]

var text3 = [
    'Hello, Watson', // 第三轮，RR测试，[Jane]
    'what else you can do?',
    'I want to know someting about success',
    'How to define success?',
    'very very good',
    '#TONERESULT#'  
]

// 只修改这里
text = text1;

// Visual Recognition
//var text = [
//    'Hello, Watson',
//    'Can you take a picture?',
//    'It is a so bad result.'
//]

//set up serInternal starts to run
//GPIO.initLED(300);
//GPIO.startBreathLED(10);


let server = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("text", function (str) {
        if(str.match(/#TRANSLATE#/)){
            translate(str.substr(11));
        }else if(str.match(/#SPEECH#/)){

        }else{
            text = [str];
            startConv(0);
        }
	});

    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(3000);

function translate(text){
    languageTranslator.translator(text, function(translatedText){
        console.info('Translating...');
        server.connections.forEach(function (connection) {
            connection.sendText('{"msg": "'+ ('' + encodeURIComponent(translatedText)) +'"}');
        });
    });
}

function startConv(i){
    //GPIO.modeKey.mode = 'flow';
    
    if(text[i].match(/#TONE#/g)){
        tone(text[i].substr(6));
        return false;
    }
    (text[i] === undefined) ? '' : conversation.conversation(text[i], function(msg, _node, _entity){
        // 清屏
        //console.log('\x1Bc');
        
        console.log('我: ' + text[i], ' || 沃森: ' + msg);
        server.connections.forEach(function (connection) {
            connection.sendText('{"msg": "'+ ('' + encodeURIComponent(msg)) +'"}');
        });
        //console.log('Watson: ' + msg);
        
        //GPIO.modeKey.mode = 'blink';
        t2s.runSpeech(msg[0], function(){
            // End speaking
            //console.log(_node, ' - ', _entity);
            
            if(_node === 'news-frequency-ok' && _entity === 'news_frequency'){
                console.log('newsKeyword: ', newsKeyword);
                alchemyDataNews.alchemyDataNews('now-7d', newsKeyword, function(data){
                    if(data.status === 'OK'){
                        let preText = '<h3 style="font-size: 15px; margin: 4px 0;">Here is what I got the news:</h3>';
                        let newsResult = preText + '';
                        for(var k = 0; k < data.result.docs.length; k++){
                            newsResult += '<p style="margin-bottom: 0;">' + data.result.docs[k].source.enriched.url.title + '</p><p style="margin-top: 0;"><a target="_blank" href="'+ data.result.docs[k].source.enriched.url.url +'">'+ data.result.docs[k].source.enriched.url.url +'</a></p>';
                        }
                        
                        console.log('Result: ', newsResult);
                        
                        server.connections.forEach(function (connection) {
                            connection.sendText('{"msg": "'+ ('' + encodeURIComponent(newsResult)) +'"}');
                        });
                    }else{
                    }
                });
                
                // @todo: 略过alchemyDataNews，以免限制
//                console.log('新闻结果: 跳过');
//                startConv(++i);
                
                return false;
            }else if(_node === 'capability-visualization-start' || _node === 'capability-vi'){
                var timer = 5;
                //console.info('开始图像识别');
                server.connections.forEach(function (connection) {
                    connection.sendText('{"msg": "Taking picture"}');
                });
                var letr = setInterval(function(){
                    server.connections.forEach(function (connection) {
                        connection.sendText('{"msg": '+ timer +'}');
                    });
                    if(timer === 0){
                        clearInterval(letr);
                        recognizeImage();
                    }
                    timer--;
                }, 1000);
                
                return false;
            }else if(_node === 'news-keyword-ok'){
                console.info('-- KEYWORD --', text[0]);
                newsKeyword = text[0];
            }else if(_node === 'rr-triggered'){
                RR.RR(text[i], function(data){
                    console.log('RR结果：' + data[0].searchText[1]);
                    server.connections.forEach(function (connection) {
                        connection.sendText('{"msg": "'+ (data[0].searchText[1]) +'<br /><br />Do you like my answer?"}');
                    });
                    t2s.runSpeech(data[0].searchText[1] + ', do you like my answer?', function(){
                    });
                });
                
                return false;
            }else{
            }
        });
    });
}

function recognizeImage(){
    visualRecognition.analysis(function(data){
        if(data){
            console.log('图像识别结果:');
            let newData = data.images[0].classifiers[0].classes.sort(function(a, b){
                return b.score > a.score;
            });
            
            console.log('我能看到: ' + newData[0]['class'] + ' and ' + newData[1]['class']);
            server.connections.forEach(function (connection) {
                connection.sendText('{"msg": "'+ ('I can see: ' + newData[0]['class'] + ' and ' + newData[1]['class']) +', do you like my answer?"}');
            });
            // t2s.runSpeech('I can see: ' + newData[0]['class'] + ' and ' + newData[1]['class'] + ', How do you feel my answer?', function(){
            //     i++;
            //     //console.log('我: ' + text[i]);
            //     toneAnalyzer.toneAnalyzer(text[i], function(data){
            //         i++;
            //         var toneData = data.document_tone.tone_categories[0].tones.sort(function(a, b){
            //             return b.score > a.score;
            //         });
                    
            //         //console.log('语气结果:');
            //         //console.log(toneData[0].tone_name);
            //         text[i] = toneData[0].tone_name;
                    
            //         // Continue the conversion
            //         startConv(i);
            //     });
            // });
        }else{
            return false;
        }
    });
}

function tone(t){
    toneAnalyzer.toneAnalyzer(t, function(data){
        var toneData = data.document_tone.tone_categories[0].tones.sort(function(a, b){
            return b.score > a.score;
        });
        
        //console.log('语气结果:');
        //console.log(toneData[0].tone_name);
        text[0] = toneData[0].tone_name;
        
        // Continue the conversion
        startConv(0);
        // server.connections.forEach(function (connection) {
        //     connection.sendText('{"msg": "'+ ('Tone: ' + toneData[0].tone_name) +'"}');
        // });
    });
}