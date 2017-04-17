let GPIO = require('../GPIO_light.js');
//let visualRecognition = require('../cameraRecognition.js');

//visualRecognition.analysis();
//GPIO.initKey();
var aa = GPIO.ctlLED(100, "flow");

setTimeout(function(){
    clearInterval(aa);
    GPIO.ctlLED(100, "blink");
}, 3000);

GPIO.startBreathLED(10);
