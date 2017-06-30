let watson = require(
    'watson-developer-cloud'
);
/* the visual analysis api in watson limits uploaded picture size less than 2M
 *  execute this command to compress picture to 1500Kb
 */
let fs = require('fs');

let visual_recognition = watson.visual_recognition({
    api_key: 'b6c9eaec4f1a331526564bf555c7031298ace7ae',
    version: 'v3',
    version_date: '2016-05-20'
});

/* take a picture and compress it finally recognize
 */
function analysis(callback) {
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
};

module.exports = {
    analysis: analysis
};
