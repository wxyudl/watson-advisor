var watson = require('watson-developer-cloud');
var qs = require('qs');
var ranker_id = '1eec7cx29-rank-3280';

var retrieve_and_rank = watson.retrieve_and_rank({
    username: '11115d29-3240-4ea5-87c0-bdaedbf5655b',
    password: 'bj2lolF2W5fU',
    version: 'v1'
});

var params = {
    cluster_id: 'sc8f2c270d_b74e_4915_bc70_434364eb36bd',
    collection_name: 'life_guider'
};

var solrClient = retrieve_and_rank.createSolrClient(params);

function RRFn(question, callback){
    var query  = qs.stringify({q: question, ranker_id: ranker_id, fl: 'id,title,searchText', rows: 30});

    solrClient.get('fcselect', query, function(err, searchResponse) {
        if(err) {
            console.log('Error searching for documents: ' + err);
        }else {
            callback(searchResponse.response.docs);
        }
    });
}

module.exports = {
    RR: RRFn
};