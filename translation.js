watson = require('watson-developer-cloud');
var fs = require('fs');
var JSONStream = require('JSONStream');
var readStream = fs.createReadStream('./transcription.txt');

var language_translator = watson.language_translator({
  "url": "https://gateway.watsonplatform.net/language-translator/api",
  "password": "n4gmdEnBRacA",
  "username": "eb9c1636-0097-44ae-96f4-8e23da4533f8",
  "version": "v2"
});

readStream.on('data', function(chunk){
  language_translator.translate({
    model_id: 'zh-en-patent',
    text: chunk + '',
  }, function(err, translation) {
    if (err)
      console.log(err)
    else
      console.log(translation.translations[0].translation);
  });
});
