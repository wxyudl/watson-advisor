let SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
let Mic = require('node-microphone');
let mic = new Mic();
let micStream = mic.startRecording();

let speechToText = new SpeechToTextV1({
  username: '768b5ec4-edc2-4ec7-91a7-dba43055a8fa',
  password: 'cVmzXgBiKV17'
});

let speechToTextStream = speechToText.createRecognizeStream({
  model: 'zh-CN_BroadbandModel',
  Content_type: 'audio/ogg;codecs=opus; rate=48000; channels=1',
  continuous: true
});

let speechToTextPipe = micStream.pipe(speechToTextStream);
module.exports = {
  stream: speechToTextPipe
}
