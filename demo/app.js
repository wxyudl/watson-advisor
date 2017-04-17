let GPIO = require('../GPIO_light.js');
//let visualRecognition = require('../cameraRecognition.js');

//visualRecognition.analysis();
//GPIO.initKey();
GPIO.initLED(300);
GPIO.modeKey.mode = 'flow';

setTimeout(function(){
    GPIO.modeKey.mode = 'blink';
}, 3000);

setTimeout(function(){
    GPIO.modeKey.mode = 'toggle';
}, 6000);

GPIO.startBreathLED(10);
