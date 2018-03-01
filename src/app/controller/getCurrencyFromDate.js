module.exports = function(cubes, date, currency) {
    let cube = cubes.filter(e => e._attributes.date == date);
    if(cube[0] != undefined) {
        let rates = cube[0].Rate;
        let result = rates.filter(e => e._attributes.currency == currency)[0]._text;
        return result;
    } else {
        return "Error: There is no currency from this date.";
    }
}