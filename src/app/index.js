const fs = require('fs');
const convertXML = require('./controller/convertXML');
const getCurrencyFromDate = require('./controller/getCurrencyFromDate');

module.exports = function(date, currency, callback) {

    let dateObject = new Date(date);
    let year = dateObject.getFullYear();

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    if(parseInt(year) < parseInt(currentYear) && parseInt(year) > 2004) {
        fs.readFile( __dirname + '/data/' + year + '.xml', function(err, res) {
            if(err) { 
                console.log('Error reading file!', err); 
            } else {
                processJSON(convertXML(res));
            }
        });
    } else if (parseInt(year) <= 2004) {
        console.log("Error: There is no information regarding year ", year);
        callback(
            {    
                "date": date,
                "currency": currency,
                "value": "There is no information regarding year " + year,
                "source": "http://www.bnr.ro/Cursurile-pietei-valutare-in-format-XML-3424.aspx"
            }
        );
    }

    function processJSON(json) {
        let result = JSON.parse(json);
        let cubes = result.DataSet.Body.Cube;
        /**
         * find a date => cubes[i]._attributes.date = "{date}";
         * find a currency => cubes[i].Rate.filter(e => e._attributes.currency == "{currency}");
         * return the values => cubes[i].Rate.filter(e => e._attributes.currency == "{currency}")[0]._text;
         */
        callback(
            {
                "date": date,
                "currency": currency,
                "value": getCurrencyFromDate(cubes, date, currency),
                "source": "http://www.bnr.ro/Cursurile-pietei-valutare-in-format-XML-3424.aspx"
            } 
        );
    }
}