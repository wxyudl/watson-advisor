/*jshint esversion: 6 */
var exec = require('child_process').exec;

function translator(text, callback){
    var execCurl = "curl -XGET 'http://fanyi.baidu.com/v2transapi?from=zh&to=en&query="+ encodeURIComponent(text) +"&transtype=translang&simple_means_flag=1'";

    console.log();
    console.time('Translator timing');
    exec(execCurl, function (error, stdout, stderr) {
        console.timeEnd('Translator timing');
        var date = JSON.parse(stdout);
        callback(date['trans_result']['data'][0]['dst']);
    });
}

module.exports = {
    translator: translator
};
