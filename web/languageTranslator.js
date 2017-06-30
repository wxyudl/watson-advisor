/*jshint esversion: 6 */
var watson = watson || require('watson-developer-cloud');

let languageTranslator = watson.language_translator({
  "url": "https://gateway.watsonplatform.net/language-translator/api",
  "password": "n4gmdEnBRacA",
  "username": "eb9c1636-0097-44ae-96f4-8e23da4533f8",
  "version": "v2"
});

function translator(text, callback){
  languageTranslator.translate({
    model_id: 'zh-en-patent',
    text: text,
  }, function(err, translation) {
    if (err){
      console.log(err);
    }else{
      callback(translation.translations[0].translation);
    }
  });
}

module.exports = {
  translator: translator
};
