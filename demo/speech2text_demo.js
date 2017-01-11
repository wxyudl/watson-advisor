let speechToTextStream = require('../speech2text.js');
let through2 = require('through2');
let text = '';

let stream = through2({ objectMode: true }, function(chunk, enc, callback) {
    let string = chunk.toString()
    let result = string.replace(/\n/, '').toUpperCase().split(/[ \t]/)

    this.push(result)
    callback();
});

stream.on('data', function(data) {
    text += data.join(' ');
    console.log(text);
});

speechToTextStream.stream.pipe(stream);
