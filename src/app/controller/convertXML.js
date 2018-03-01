const convert = require('xml-js');

module.exports = function(xml) {
    return convert.xml2json(xml, {
        compact: true
    });
}