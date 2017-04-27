let Mic = require('node-microphone');
var fs = require('fs');
let mic = new Mic();
let micStream = mic.startRecording();


micStream.pipe(fs.createWriteStream('./testMic.wav'));