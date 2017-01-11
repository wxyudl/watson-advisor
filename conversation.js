/*jshint esversion: 6 */
var watson = watson || require('watson-developer-cloud');
let conversationObj = {};
let conversation = watson.conversation({
  url: 'https://gateway.watsonplatform.net/conversation/api',
  password: 'EzAusm47LGKz',
  username: 'b2f8ac80-f812-48ea-899f-707980d46136',
  version: 'v1',
  version_date: '2016-09-20'
});

conversationObj.context = {};

function conversationFn(msg, callback){
  conversation.message({
    workspace_id: '9d2b65b3-9658-4b64-a89f-58436b442a8b',
    input: {
      'text': msg
    },
    context: conversationObj.context
  }, function(err, response) {
    if (err){
      _msg = 'error:' + err;
    }else{
      _msg = response.output.text;
    }

    conversationObj.context = response.context;
    callback(_msg);
  });
}

module.exports = {
  conversation: conversationFn
};
