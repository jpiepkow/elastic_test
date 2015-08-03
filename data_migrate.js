var elasticsearch = require('elasticsearch');
var request = require('request');
var data = {};

request('http://mock-api.smartermeasure.com/v4/results', function (err, response, body) {

    if (err) {
        console.log(err);
    } else {
            data = JSON.parse(body);
            indexData(data);
            searchData()
    }
});

var client = new elasticsearch.Client({
    host: 'https://VOCFRfp406LdFsRmlkhEwGI2zV57kHEi:@jordantest.east-us.azr.facetflow.io',
    apiVersion: '1.0'
});
function indexData(data) {
    for (var i = 0; i < data.results.length; i++) {
        client.index({
            index: 'myindex',
            type: 'object',
            tokenizer: 'whitespace',
            id: "1",
            body: {
                this1: {
                    blahh: "blahh",
                    nested: {
                        thats: "one",
                        supernested: {
                            value: "this"
                        }
                    }
                }
            }
        }, function (error, response) {

        });
    }
}
function searchData(searchTerm) {
    client.search({
        index: 'myindex',
            facets: {
                tags: {
                    terms: {
                        field: ''
                    }
                }
            }
    }, function (error, response) {
        console.log(response.hits.hits);
    });
}



