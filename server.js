const express = require('express');
const app = express();
const init = require('./src/app/index');

app.get('/:date/:currency', (req, res) => { 
    let date = req.params.date;
    let currency = req.params.currency;
    init(date, currency, function(result) {
        res.send(result); 
    });
});


app.listen(8000, () => {
    console.log('Loading...');
    console.log('Example app listening on port 8000!');
    console.log('Stop the server by pressing ctrl + c');
});