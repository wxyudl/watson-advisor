var wpi = require('wiring-pi');
var modeKey = {
    mode: "off"
};
wpi.setup('gpio');
// flow light gpio
wpi.pinMode(0, wpi.OUTPUT);
wpi.pinMode(1, wpi.OUTPUT);
wpi.pinMode(2, wpi.OUTPUT);
wpi.pinMode(3, wpi.OUTPUT);
wpi.pinMode(4, wpi.OUTPUT);
wpi.pinMode(5, wpi.OUTPUT);
wpi.pinMode(6, wpi.OUTPUT);
wpi.pinMode(7, wpi.OUTPUT);
// breathLED gpio
wpi.pinMode(12, wpi.PWM_OUTPUT); // Red
wpi.pinMode(13, wpi.PWM_OUTPUT); // Green
wpi.pinMode(18, wpi.PWM_OUTPUT); // Blue
/*
function randomGenerateR() {
    let floatRandom = Math.random();
    let intRandom = Math.round(floatRandom * 1024);
    return intRandom;
}

function randomGenerateG() {
    let floatRandom = Math.random();
    let intRandom = Math.round(floatRandom * 1024);
    return intRandom;
}
*/
function randomGenerate() {
    let floatRandom = Math.random();
    let intRandom = Math.round(floatRandom * 1024);
    return intRandom;
}
var rPwm = 0;
var gPwm = 512;
var bPwm = 1024;

function breathLED(rPwm, gPwm, bPwm) {
    wpi.pwmWrite(12, rPwm);
    wpi.pwmWrite(13, gPwm);
    wpi.pwmWrite(18, bPwm);
}

//wpi.pinMode(8, wpi.INPUT);
//var keyBuf1 = 1;
//var keyBackUp1 = 1;

//wpi.pinMode(9, wpi.INPUT);
//var keyBuf2 = 1;
//var keyBackUp2 = 1;

//wpi.pinMode(10, wpi.INPUT);
//var keyBuf3 = 1;
//var keyBackUp3 = 1;

//wpi.pinMode(11, wpi.INPUT);
//var keyBuf4 = 1;
//var keyBackUp4 = 1;
/*
let keyDownNum = 0;

function testKey1() {
    keyBuf1 = wpi.digitalRead(8); //把当前扫描值暂存
    if (keyBuf1 != keyBackUp1) { //当前值与前次值不相等说明此时按键有动作
        wpi.delay(10); //延时大约 10ms
        if (keyBuf1 == wpi.digitalRead(8)) { //判断扫描值有没有发生改变，即按键抖动
            if (keyBackUp1 == 0) { //如果前次值为 0，则说明当前是弹起动作
                keyDownNum = 1;
                console.log(keyDownNum);
            }
            keyBackUp1 = keyBuf1; //更新备份为当前值，以备进行下次比较
        }
    }
};

function testKey2() {
    keyBuf2 = wpi.digitalRead(9); //把当前扫描值暂存
    if (keyBuf2 != keyBackUp2) { //当前值与前次值不相等说明此时按键有动作
        wpi.delay(10); //延时大约 10ms
        if (keyBuf2 == wpi.digitalRead(9)) { //判断扫描值有没有发生改变，即按键抖动
            if (keyBackUp2 == 0) { //如果前次值为 0，则说明当前是弹起动作
                keyDownNum = 2;
                console.log(keyDownNum);
            }
            keyBackUp2 = keyBuf2; //更新备份为当前值，以备进行下次比较
        }
    }
};

function testKey3() {
    keyBuf3 = wpi.digitalRead(10); //把当前扫描值暂存
    if (keyBuf3 != keyBackUp3) { //当前值与前次值不相等说明此时按键有动作
        wpi.delay(10); //延时大约 10ms
        if (keyBuf3 == wpi.digitalRead(10)) { //判断扫描值有没有发生改变，即按键抖动
            if (keyBackUp3 == 0) { //如果前次值为 0，则说明当前是弹起动作
                keyDownNum = 3;
                console.log(keyDownNum);
            }
            keyBackUp3 = keyBuf3; //更新备份为当前值，以备进行下次比较
        }
    }
};

function testKey4() {
    keyBuf4 = wpi.digitalRead(11); //把当前扫描值暂存
    if (keyBuf4 != keyBackUp4) { //当前值与前次值不相等说明此时按键有动作
        wpi.delay(10); //延时大约 10ms
        if (keyBuf4 == wpi.digitalRead(11)) { //判断扫描值有没有发生改变，即按键抖动
            if (keyBackUp4 == 0) { //如果前次值为 0，则说明当前是弹起动作
                keyDownNum = 4;
                console.log(keyDownNum);
            }
            keyBackUp4 = keyBuf4; //更新备份为当前值，以备进行下次比较
        }
    }
};

function getKeyDownNum() {
    return keyDownNum;
}*/

// flowCount: blinking clock count
var blinkCount = 0;
var lighton = 0; //lights on
var lightoff = 1; //light off
function flowLight(blinkCount) {
    switch (blinkCount) {
        case 0:
            wpi.digitalWrite(0, lighton);
            wpi.digitalWrite(1, lightoff);
            wpi.digitalWrite(2, lightoff);
            wpi.digitalWrite(3, lightoff);
            wpi.digitalWrite(4, lightoff);
            wpi.digitalWrite(5, lightoff);
            wpi.digitalWrite(6, lightoff);
            wpi.digitalWrite(7, lightoff);
            break;
        case 1:
            wpi.digitalWrite(0, lightoff);
            wpi.digitalWrite(1, lighton);
            wpi.digitalWrite(2, lightoff);
            wpi.digitalWrite(3, lightoff);
            wpi.digitalWrite(4, lightoff);
            wpi.digitalWrite(5, lightoff);
            wpi.digitalWrite(6, lightoff);
            wpi.digitalWrite(7, lightoff);
            break;
        case 2:
            wpi.digitalWrite(0, lightoff);
            wpi.digitalWrite(1, lightoff);
            wpi.digitalWrite(2, lighton);
            wpi.digitalWrite(3, lightoff);
            wpi.digitalWrite(4, lightoff);
            wpi.digitalWrite(5, lightoff);
            wpi.digitalWrite(6, lightoff);
            wpi.digitalWrite(7, lightoff);
            break;
        case 3:
            wpi.digitalWrite(0, lightoff);
            wpi.digitalWrite(1, lightoff);
            wpi.digitalWrite(2, lightoff);
            wpi.digitalWrite(3, lighton);
            wpi.digitalWrite(4, lightoff);
            wpi.digitalWrite(5, lightoff);
            wpi.digitalWrite(6, lightoff);
            wpi.digitalWrite(7, lightoff);
            break;
        case 4:
            wpi.digitalWrite(0, lightoff);
            wpi.digitalWrite(1, lightoff);
            wpi.digitalWrite(2, lightoff);
            wpi.digitalWrite(3, lightoff);
            wpi.digitalWrite(4, lighton);
            wpi.digitalWrite(5, lightoff);
            wpi.digitalWrite(6, lightoff);
            wpi.digitalWrite(7, lightoff);
            break;
        case 5:
            wpi.digitalWrite(0, lightoff);
            wpi.digitalWrite(1, lightoff);
            wpi.digitalWrite(2, lightoff);
            wpi.digitalWrite(3, lightoff);
            wpi.digitalWrite(4, lightoff);
            wpi.digitalWrite(5, lighton);
            wpi.digitalWrite(6, lightoff);
            wpi.digitalWrite(7, lightoff);
            break;
        case 6:
            wpi.digitalWrite(0, lightoff);
            wpi.digitalWrite(1, lightoff);
            wpi.digitalWrite(2, lightoff);
            wpi.digitalWrite(3, lightoff);
            wpi.digitalWrite(4, lightoff);
            wpi.digitalWrite(5, lightoff);
            wpi.digitalWrite(6, lighton);
            wpi.digitalWrite(7, lightoff);
            break;
        case 7:
            wpi.digitalWrite(0, lightoff);
            wpi.digitalWrite(1, lightoff);
            wpi.digitalWrite(2, lightoff);
            wpi.digitalWrite(3, lightoff);
            wpi.digitalWrite(4, lightoff);
            wpi.digitalWrite(5, lightoff);
            wpi.digitalWrite(6, lightoff);
            wpi.digitalWrite(7, lighton);
            break;
    }
}

function halfToggleLight(blinkCount) {
    if (blinkCount % 2) {
        wpi.digitalWrite(0, lighton);
        wpi.digitalWrite(1, lightoff);
        wpi.digitalWrite(2, lighton);
        wpi.digitalWrite(3, lightoff);
        wpi.digitalWrite(4, lighton);
        wpi.digitalWrite(5, lightoff);
        wpi.digitalWrite(6, lighton);
        wpi.digitalWrite(7, lightoff);
    } else {
        wpi.digitalWrite(0, lightoff);
        wpi.digitalWrite(1, lighton);
        wpi.digitalWrite(2, lightoff);
        wpi.digitalWrite(3, lighton);
        wpi.digitalWrite(4, lightoff);
        wpi.digitalWrite(5, lighton);
        wpi.digitalWrite(6, lightoff);
        wpi.digitalWrite(7, lighton);
    }
}

function toggleLight(blinkCount) {
    if (blinkCount % 2) {
        wpi.digitalWrite(0, lighton);
        wpi.digitalWrite(1, lighton);
        wpi.digitalWrite(2, lighton);
        wpi.digitalWrite(3, lighton);
        wpi.digitalWrite(4, lighton);
        wpi.digitalWrite(5, lighton);
        wpi.digitalWrite(6, lighton);
        wpi.digitalWrite(7, lighton);
    } else {
        wpi.digitalWrite(0, lightoff);
        wpi.digitalWrite(1, lightoff);
        wpi.digitalWrite(2, lightoff);
        wpi.digitalWrite(3, lightoff);
        wpi.digitalWrite(4, lightoff);
        wpi.digitalWrite(5, lightoff);
        wpi.digitalWrite(6, lightoff);
        wpi.digitalWrite(7, lightoff);
    }
}

function shutDownLight() {
    wpi.digitalWrite(0, lightoff);
    wpi.digitalWrite(1, lightoff);
    wpi.digitalWrite(2, lightoff);
    wpi.digitalWrite(3, lightoff);
    wpi.digitalWrite(4, lightoff);
    wpi.digitalWrite(5, lightoff);
    wpi.digitalWrite(6, lightoff);
    wpi.digitalWrite(7, lightoff);
}
/*
function breathLight(onOffBoolean, timeOut) {
    if (onOffBoolean) {
        while (1) {

        }
    }
}*/

/*
function initKey() {
    setInterval(function() {
        testKey1();
        testKey2();
        testKey3();
        testKey4();
    }, 1);
}*/

function initLED(period) {
    setInterval(function() {
        if (blinkCount > 7) {
            blinkCount = 0;
        } else {
            blinkCount++;
        }

        switch (modeKey.mode) {
            case "flow":
                flowLight(blinkCount);
                break;
            case "toggle":
                halfToggleLight(blinkCount);
                break;
            case "blink":
                toggleLight(blinkCount);
                break;
            case "off":
                shutDownLight(blinkCount);
                break;
        }
    }, period);
    
    
//    setTimeout(function(){
//        modeKey.mode = 'flow';
//    }, 2000);
}

function startBreathLED(period) {
    setInterval(function() {
        if (rPwm > 1024) {
            rPwm = randomGenerate();
        }
        rPwm++;
        if (gPwm > 1024) {
            gPwm = randomGenerate();
        }
        gPwm++;
        if (bPwm > 1024) {
            bPwm = randomGenerate();
        };
        bPwm++;
        breathLED(rPwm, gPwm, bPwm);
    }, period);
}
module.exports = {
    modeKey: modeKey,
    initLED: initLED,
    startBreathLED: startBreathLED
};
