let watson = require(
    'watson-developer-cloud'
);

// execute OS linux command
let exec = require('child_process').exec;

// linux command to capture picture from camera
let takePic = "raspistill -w 300 -h 300 -t 2 -o sample.jpg";
/* the visual analysis api in watson limits uploaded picture size less than 2M
 *  execute this command to compress picture to 1500Kb
 */
let fs = require('fs');

let visual_recognition = watson.visual_recognition({
    api_key: '55c85a4304deb5441e8518a9d0225f7e77809940',
    version: 'v3',
    version_date: '2016-05-20'
});

/* take a picture and compress it finally recognize
 */
function analysis(callback) {
    exec(takePic, function(err, stdout, stderr) {
        if (err) {
            console.log('error:' + stderr);
        } else {
            console.log("jpg ready!");
            visual_recognition.classify({
                "images_file": fs.createReadStream(
                    "sample.jpg"),
                "threshold": 0.0
            }, function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    callback(res);
                }
            });
        }
    });
};

module.exports = {
    analysis: analysis
};
