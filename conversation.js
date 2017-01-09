var watson = require('watson-developer-cloud');
var conversation = watson.conversation({
  url: 'https://gateway.watsonplatform.net/conversation/api',
  password: 'EzAusm47LGKz',
  username: 'b2f8ac80-f812-48ea-899f-707980d46136',
  version: 'v1',
  version_date: '2016-09-20'
});
var context = {};

conversation.message({
  workspace_id: '9d2b65b3-9658-4b64-a89f-58436b442a8b',
  input: {
    'text': ''
  },
  context: context
}, function(err, response) {
  console.log(
    "*************************************conversation 1**********************************"
  );
  //console.log('Conversation Context:  ');
  //console.log(context);
  if (err)
    console.log('error:', err);
  else
    console.log('Conversation Response: ' + response.output.text);
  //console.log('Next Conversation Context:  ');
  //console.log(response.context);
  context = response.context;

  conversation.message({
    workspace_id: '9d2b65b3-9658-4b64-a89f-58436b442a8b',
    input: {
      'text': 'news'
    },
    context: context
  }, function(err, response) {
    console.log(
      "*************************************conversation 2**********************************"
    );
    //console.log('Conversation Context:  ');
    //console.log(context);
    if (err)
      console.log('error:', err);
    else
      console.log('Conversation Response: ' + response.output.text);
    //console.log('Next Conversation Context:  ');
    //console.log(response.context);
    context = response.context;
    conversation.message({
      workspace_id: '9d2b65b3-9658-4b64-a89f-58436b442a8b',
      input: {
        'text': 'messi'
      },
      context: context
    }, function(err, response) {
      console.log(
        "*************************************conversation 3**********************************"
      );
      //console.log('Conversation Context:  ');
      //console.log(context);
      if (err)
        console.log('error:', err);
      else
        console.log('Conversation Response: ' + response.output.text);
      //console.log('Next Conversation Context:  ');
      //console.log(response.context);
      context = response.context;
      conversation.message({
        workspace_id: '9d2b65b3-9658-4b64-a89f-58436b442a8b',
        input: {
          'text': 'people'
        },
        context: context
      }, function(err, response) {
        console.log(
          "*************************************conversation 4**********************************"
        );
        //console.log('Conversation Context:  ');
        //console.log(context);
        if (err)
          console.log('error:', err);
        else
          console.log('Conversation Response: ' + response.output
            .text);
        //console.log('Next Conversation Context:  ');
        //console.log(response.context);
        context = response.context;
        conversation.message({
          workspace_id: '9d2b65b3-9658-4b64-a89f-58436b442a8b',
          input: {
            'text': 'positive'
          },
          context: context
        }, function(err, response) {
          console.log(
            "*************************************conversation 5**********************************"
          );
          //console.log('Conversation Context:  ');
          //console.log(context);
          if (err)
            console.log('error:', err);
          else
            console.log('Conversation Response: ' +
              response.output.text);
          //console.log('Next Conversation Context:  ');
          //console.log(response.context);
          context = response.context;
          conversation.message({
            workspace_id: '9d2b65b3-9658-4b64-a89f-58436b442a8b',
            input: {
              'text': 'sports'
            },
            context: context
          }, function(err, response) {
            console.log(
              "*************************************conversation 6**********************************"
            );
            //console.log('Conversation Context:  ');
            //console.log(context);
            if (err)
              console.log('error:', err);
            else
              console.log('Conversation Response: ' +
                response.output.text);
            //console.log('Next Conversation Context:  ');
            //console.log(response.context);
            context = response.context;
            conversation.message({
              workspace_id: '9d2b65b3-9658-4b64-a89f-58436b442a8b',
              input: {
                'text': 'today'
              },
              context: context
            }, function(err, response) {
              console.log(
                "*************************************conversation 7**********************************"
              );
              //console.log('Conversation Context:  ');
              //console.log(context);
              if (err)
                console.log('error:', err);
              else
                console.log(
                  'Conversation Response: ' +
                  response.output.text);
              //console.log('Next Conversation Context:  ');
              //console.log(response.context);
              context = response.context;
              console.log(response);
            });
          });
        });
      });
    });
  });
});

