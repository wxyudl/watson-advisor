/*jshint esversion: 6 */
let conversation = require('../conversation.js');
let alchemyDataNews = require('../alchemyDataNews.js');
let visualRecognition = require('../cameraRecognition.js');
let toneAnalyzer = require('../toneAnalyzer.js');
let GPIO = require('../GPIO_light.js');
let t2s = require('../text2speech.js');
let RR = require('../rr.js');
var newsKeyword = '';

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
text = text3;

// Visual Recognition
//var text = [
//    'Hello, Watson',
//    'Can you take a picture?',
//    'It is a so bad result.'
//]

//set up serInternal starts to run
GPIO.initLED(300);
GPIO.startBreathLED(10);

function startConv(i){
    GPIO.modeKey.mode = 'flow';
    
    (text[i] === undefined) ? '' : conversation.conversation(text[i], function(msg, _node, _entity){
        // 清屏
        console.log('\x1Bc');
//        for(var _i = 0; _i < 15; _i++){
//            console.log('');
//        }
        
        //console.log('我: ' + text[i], ' || 沃森: ' + msg);
        //console.log('Watson: ' + msg);
        
        GPIO.modeKey.mode = 'blink';
        t2s.runSpeech(msg[0], function(){
            // End speaking
            //console.log(_node, ' - ', _entity);
            
            if(_node === 'news-frequency-ok' && _entity === 'news_frequency'){
                alchemyDataNews.alchemyDataNews('now-7d', newsKeyword, function(data){
                    if(data.status === 'OK'){
                        
                        let preText = 'Here is what I got the news, ';
                        let newsResult = preText + data.result.docs[0].source.enriched.url.text;
                        console.log('Result: ', newsResult);
                        
                        t2s.runSpeech(newsResult, function(){
                            startConv(++i);
                        });
                    }else{
                        startConv(++i);
                    }
                });
                
                // @todo: 略过alchemyDataNews，以免限制
//                console.log('新闻结果: 跳过');
//                startConv(++i);
                
                return false;
            }else if(_node === 'capability-visualization-start' || _node === 'capability-vi'){
                //console.info('开始图像识别');
                visualRecognition.analysis(function(data){
                    if(data){
                        //console.log('图像识别结果:');
                        let newData = data.images[0].classifiers[0].classes.sort(function(a, b){
                            return b.score > a.score;
                        });
                        
                        //console.log('我能看到: ' + newData[0]['class'] + ' and ' + newData[1]['class']);
                        
                        t2s.runSpeech('I can see: ' + newData[0]['class'] + ' and ' + newData[1]['class'] + ', How do you feel my answer?', function(){
                            i++;
                            //console.log('我: ' + text[i]);
                            toneAnalyzer.toneAnalyzer(text[i], function(data){
                                i++;
                                var toneData = data.document_tone.tone_categories[0].tones.sort(function(a, b){
                                    return b.score > a.score;
                                });
                                
                                //console.log('语气结果:');
                                //console.log(toneData[0].tone_name);
                                text[i] = toneData[0].tone_name;
                                
                                // Continue the conversion
                                startConv(i);
                            });
                        });
                    }else{
                        return false;
                    }
                });
                
                return false;
            }else if(_node === 'news-keyword-ok'){
                newsKeyword = text[i];
            }else if(_node === 'rr-triggered'){
                RR.RR(text[i], function(data){
                    //console.log('RR结果：' + data[0].searchText[1]);
                    t2s.runSpeech(data[0].searchText[1] + ', How do you feel my answer?', function(){
                        i++;
                        //console.log('我: ' + text[i]);
                        toneAnalyzer.toneAnalyzer(text[i], function(data){
                            i++;
                            var toneData = data.document_tone.tone_categories[0].tones.sort(function(a, b){
                                return b.score > a.score;
                            });
                            
                            //console.log('语气结果:');
                            //console.log(toneData[0].tone_name);
                            text[i] = toneData[0].tone_name;
                            
                            // Continue the conversion
                            startConv(i);
                        });
                    });
                });
                
                return false;
            }else{
            }
            
            if (i < text.length){
                startConv(++i);
            }
        });
    });
}

startConv(0);