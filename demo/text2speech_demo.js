/*jshint esversion: 6 */
let t2s = require('../text2speech.js');
let text = 'This specific post has gotten about 25% of all the viewings of my blog. I’m not sure why this is the case but I speculate that there are many people tying to make RPi into a Media Player and looking for answers to their technical problems.';

t2s.runSpeech(text);