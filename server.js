const express = require('express');
const app = express();
const init = require('./src/app/index');
const getCurrencyFromInterval = require('./src/app/controller/getCurrencyInterval');

app.get('/api/:date/:currency', (req, res) => { 
    let date = req.params.date;
    let currency = req.params.currency;
    
    init(date, currency, function(result) {
        res.send(result); 
    });
});

app.get('/api/:startDate/:endDate/:currency', (req, res) => {
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;
    let currency = req.params.currency;
    
    getCurrencyFromInterval(startDate, endDate, currency, function(result){
        res.send(result);
    })
})


app.listen(8000, () => {
    console.log('Loading...');
    console.log('Example app listening on port 8000!');
    console.log('Go to: http://localhost/api/{date}/{currency}');
    console.log('Stop the server by pressing ctrl + c');
});