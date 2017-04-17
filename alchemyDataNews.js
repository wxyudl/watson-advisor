var watson = require('watson-developer-cloud');

var alchemy_data_news = watson.alchemy_data_news({
    api_key: '96a994ec90aa5c3f0363a98e6b01b4709d9f8dca'
});

function alchemyDataNewsFn(start, title, callback){
    var params = {
        start: start,
        end: 'now',
        count: 5,
        'q.enriched.url.enrichedTitle.entities.entity': '|text='+ title +'|',
        'return': 'enriched.url.text,enriched.url.url,enriched.url.publicationDate'
    };

    alchemy_data_news.getNews(params, function (err, news) {
        if (err){
            console.log('error:', err);   
        }else{
            callback(JSON.stringify(news, null, 2));  
        }
    });
}

module.exports = {
    alchemyDataNews: alchemyDataNewsFn
};