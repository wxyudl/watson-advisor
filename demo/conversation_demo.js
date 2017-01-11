/*jshint esversion: 6 */
let conversation = require('../conversation.js');

conversation.conversation('hi', function(msg){
  console.info(msg);
})
