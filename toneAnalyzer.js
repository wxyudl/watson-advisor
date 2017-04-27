var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
    username: 'a23db644-07d8-4e13-8a49-5e88a1ec065a',
    password: 'LVg2xOav3TUy',
    version: 'v3',
    version_date: '2016-05-19'
});

function toneAnalyzerFn(text, callback){
    tone_analyzer.tone({ text: text }, function(err, tone) {
        if (err){
            console.log(err);
        }else{
            callback(tone);
        }

    });  
}

module.exports = {
    toneAnalyzer: toneAnalyzerFn
};