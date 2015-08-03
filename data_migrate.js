var elasticsearch = require('elasticsearch');
var request = require('request');
var data = {};
request('http://mock-api.smartermeasure.com/v4/results', function (err, response, body) {

    if (err) {
        console.log(err);
    } else {
            data = JSON.parse(body);
            //indexData(data);
            basicSearch('Anthony');
            suggestSearch('Anthiny');
        //tokenizer types = standard, edgeNGram, keyword, letter, lowercase, nGram, whitespace, pattern, uax_url_email, path_hierarchy, classic
            searchAnalize('This is a new blahh', 'nGram');
            count('technical_knowledge');
            narrowSearch('Anthony');
            rangeSearch('Anthony');
    }
});

var client = new elasticsearch.Client({
    host: 'https://VOCFRfp406LdFsRmlkhEwGI2zV57kHEi:@jordantest.east-us.azr.facetflow.io',
    apiVersion: '1.0'
});
/* Content already added
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
*/
//basic search
function basicSearch(searchTerm) {
    client.search({
        index: 'myindex',
        q: searchTerm
    }, function (error, response) {
        //console.log(response.hits.hits);
    });
}
//used for autocorrect mis type.
function suggestSearch(searchTerm) {
client.suggest({
    index: 'myindex',
    body: {
        mysuggester: {
            text: searchTerm,
            term: {
                field: 'first_name'
            }
        }
    }
}, function (error, response) {
    //console.log(response.mysuggester[0]);
});
}
//Shows the results of different tokenizers on index of text.
function searchAnalize(searchTerm, token) {
    client.indices.analyze({
        index: 'myindex',
        text: searchTerm,
        tokenizer: token
    }, function (error, response) {
        //console.log(response);
    });
}
//used to get amount of documents containing, Good because its quick compared to a full query
function count(searchTerm) {
    client.count({
        index: 'myindex',
        q: searchTerm
}, function (err, response) {
//console.log(response);
});
}
function narrowSearch(searchTerm) {
    client.search({
        index: 'myindex',
        q: searchTerm,
        fields: ['first_name', 'last_name', 'email_address']
    }, function (error, response) {
        //console.log(response.hits.hits[0]);
    });
}

function rangeSearch(searchTerm) {
    client.search({
        index: 'myindex',
        body: {

            facets: {
                histo1: {
                    date_histogram: {
                        key_field: 'date_started',
                        interval : "day"
                    }
                }
            }
        }
    }, function (error, response) {
        console.log(response.hits.hits);
    });
}



