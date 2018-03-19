const fs = require('fs');
const convertXML = require('./convertXML');

module.exports = function(startDateString, endDateString, currency, callback) {
    console.log(startDateString, endDateString);
    let startDate = new Date(startDateString).getTime();
    let endDate = new Date(endDateString).getTime();
    console.log(startDate, endDate);
    fs.readFile( __dirname + '/../data/2017.xml', function(err, res) {
        if(err) { 
            console.log('Error reading file!', err); 
        } else {
            processJSON(convertXML(res));
        }
    });

    function processJSON(json) {
        let result = JSON.parse(json);
        let cubes = result.DataSet.Body.Cube;
        //console.log(cubes[0]);
        let filteredCubes =  [];
        
        cubes.forEach(function(elem, index){
            //console.log(elem._attributes.date);
            if( new Date(elem._attributes.date).getTime() >= startDate &&
                new Date(elem._attributes.date).getTime() <= endDate ) {
                filteredCubes.push(elem);
            } 
        })
        console.log(cubes.length, " vs ", filteredCubes.length);

        currencyValues = [];

        for(let cube of filteredCubes) {
            if(cube[0] != undefined) {
                let rates = cube[0].Rate;
                let result = rates.filter(e => e._attributes.currency == currency)[0]._text;
                currencyValues.push(result);        
            } 
        }

        callback( 
            {
                "result": {
                    "dateInterval": startDateString + "/" + endDateString,
                    "currency": currency,
                    "values": currencyValues
                }
            } 
        )
    }
}
