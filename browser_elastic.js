var elasticsearch = require('elasticsearch');
var ejs = require('elastic.js');

var client = new elasticsearch.Client({
    host: 'https://VOCFRfp406LdFsRmlkhEwGI2zV57kHEi:@jordantest.east-us.azr.facetflow.io',
    apiVersion: '1.0'
});

client.search({
    index: 'myindex',
    body: ejs.Request()
        .query(ejs.MatchQuery('first_name', 'Anthony'))
}, function (error, response) {
   //console.log(response.hits.hits);
});

client.search({
    index: 'myindex',
    body: ejs.Request()
        .facet(ejs.TermsFacet(2).field('attempt_number'))
}, function (error, response) {
    //console.log(response.hits.hits);
});

client.suggest({
    index: 'myindex',
    body: ejs.TermSuggester('mysuggester')
        .text('Anthiny')
        .field('first_name')
}, function (error, response) {
    console.log(response.mysuggester[0].options);
});
