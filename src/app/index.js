const cheerio = require('cheerio');
const fs = require('fs');
const convert = require('xml-js');

module.exports = function(date, currency, callback) {

    fs.readFile( __dirname + '/data/2017.xml', function(err, res) {
        if(err) { 
            console.log('Error reading file!', err); 
        } else {
            convertXML(res);
        }
    });

    function convertXML(xml) {
        let json = convert.xml2json(xml, {
            compact: true
        });

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

function getCurrencyFromDate(cubes, date, currency) {
    let cube = cubes.filter(e => e._attributes.date == date);
    if(cube[0] != undefined) {
        let rates = cube[0].Rate;
        let result = rates.filter(e => e._attributes.currency == currency)[0]._text;
        return result;
    } else {
        return "Error: There is no currency from this date.";
    }

}