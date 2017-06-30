var watson = require('watson-developer-cloud');

var alchemy_data_news = watson.alchemy_data_news({
    api_key: '96a994ec90aa5c3f0363a98e6b01b4709d9f8dca'
    //api_key: '494be3bbe4c7f2e44e9b6070f77d058354743250'
});

function alchemyDataNewsFn(start, title, callback){
    var params = {
        start: start,
        end: 'now',
        count: 5,
        'q.enriched.url.enrichedTitle.entities.entity': '|text='+ title +'|',
        'return': 'enriched.url.title,enriched.url.text,enriched.url.url,enriched.url.publicationDate'
    };

    alchemy_data_news.getNews(params, function (err, news) {
        if (err){
            console.log('error:', err);
            callback({'status': 'FAIL'});
        }else{
            callback(news);  
        }
    });
}

module.exports = {
    alchemyDataNews: alchemyDataNewsFn
};