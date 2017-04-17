/*jshint esversion: 6 */
let conversation = require('../conversation.js');
let alchemyDataNews = require('../alchemyDataNews.js');
let visualRecognition = require('../cameraRecognition.js');
let toneAnalyzer = require('../toneAnalyzer.js');
let GPIO = require('../GPIO_light.js');

// News
//var text = [
//    'h1',
//    'news',
//    'IBM',
//    'company',
//    'good',
//    'whatever',
//    'yesterday'
//]

// Visual Recognition
var text = [
    'h1',
    'picture',
    'good'
]

function startConv(i){
    conversation.conversation(text[i], function(msg, _node, _entity){
        console.log(text[i], msg);
        if(_node === 'news-frequency-ok' && _entity === 'news_frequency'){
            alchemyDataNews.alchemyDataNews('now-1d', 'IBM', function(data){
                console.log(data);
            });
        }else if(_node === 'capability-visualization-start'){
            visualRecognition.analysis(function(data){
                if(data){
                    console.log('图像识别结果:', data);
                    console.log('How do you feel my answer?');
                    toneAnalyzer.toneAnalyzer('very good', function(data){
                        console.log('语气结果:', data);
                        
                        // Continue the conversion
                        startConv(++i);
                    });
                }else{
                    return false;
                }
            });
            return false;
        }else{
        }
        
        if (i < text.length){
            startConv(++i);
        }
    });
}

startConv(0);