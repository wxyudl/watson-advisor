var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var exec = require('child_process').exec;

var text_to_speech = new TextToSpeechV1 ({
    username: '34bcea9e-a0d6-4e19-8d03-b8bff8eea077',
    password: 'tCb5nnQ7vQnV'
});

function runSpeech(text){
    console.log('Start text to speech.');
    
    var params = {
        text: text,
        voice: 'en-US_MichaelVoice',
        accept: 'audio/wav'
    };

    text_to_speech.synthesize(params, function(){
        console.log('End text to speech.');

        exec("aplay _out.wav", function (error, stdout, stderr) {
        });
    }).on('error', function(error) {
        console.log('Error:', error);
    }).pipe(fs.createWriteStream('_out.wav'));
}

module.exports = {
        runSpeech: runSpeech
};
