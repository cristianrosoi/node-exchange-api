const fs = require('fs');
const convertXML = require('./controller/convertXML');
const getCurrencyFromDate = require('./controller/getCurrencyFromDate');

module.exports = function(date, currency, callback) {

    fs.readFile( __dirname + '/data/2017.xml', function(err, res) {
        if(err) { 
            console.log('Error reading file!', err); 
        } else {
            processJSON(convertXML(res));
        }
    });

    function processJSON(json) {
        let result = JSON.parse(json);
        let cubes = result.DataSet.Body.Cube;
        /**
         * find a date => cubes[i]._attributes.date = "{date}";
         * find a currency => cubes[i].Rate.filter(e => e._attributes.currency == "{currency}");
         * return the values => cubes[i].Rate.filter(e => e._attributes.currency == "{currency}")[0]._text;
         */
        callback(
            { "result": {
                            "date": date,
                            "currency": currency,
                            "value": getCurrencyFromDate(cubes, date, currency)
                        } 
            }
        );
    }
}