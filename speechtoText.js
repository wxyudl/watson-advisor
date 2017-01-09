var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1({
  username: '768b5ec4-edc2-4ec7-91a7-dba43055a8fa',
  password: 'cVmzXgBiKV17'
});
var params = {
  model: 'zh-CN_BroadbandModel',
  //content_type: 'audio/l16; rate=48000; channels=16',
  Content_type: 'audio/ogg;codecs=opus; rate=48000; channels=1',
  continuous: true
};
let Mic = require('node-microphone');
let mic = new Mic();
let micStream = mic.startRecording();

//micStream.pipe( speech_to_text.createRecognizeStream(params) ).pipe(process.stdout);
var writeStream = fs.createWriteStream('./transcription.txt');
micStream.pipe( speech_to_text.createRecognizeStream(params) ).pipe(writeStream);
