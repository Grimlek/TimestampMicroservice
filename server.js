var express = require('express');
var moment = require('moment');

var app = express();


app.get('/:timestamp', function (req, res) {
    var timestamp = req.params.timestamp;

    var unix = null;
    var natural = null;

    if (moment.unix(timestamp).isValid()) {
        unix = moment(Number(timestamp)).unix();
        natural = moment.unix(timestamp).format('MMMM Do, YYYY');
    }
    else if (moment(timestamp, 'MMMM DD, YYYY', true).isValid()) {
        unix = moment(timestamp, 'MMMM DD, YYYY').unix();
        natural = moment(timestamp, 'MMMM DD, YYYY').format("MMMM Do, YYYY");
    }
    else if (moment(timestamp, 'MM DD, YYYY', true).isValid()) {
        unix = moment(timestamp, 'MM DD, YYYY').unix();
        natural = moment(timestamp, 'MM DD, YYYY').format("MMMM Do, YYYY");
    }
    else if (moment(timestamp, 'MM-DD-YYYY', true).isValid()) {
        unix = moment(timestamp, 'MM-DD-YYYY').unix();
        natural = moment(timestamp, 'MM-DD-YYYY').format("MMMM Do, YYYY");
    }
    else if (moment(timestamp, 'MM/DD/YYYY', true).isValid()) {
        unix = moment(timestamp, 'MM/DD/YYYY').unix();
        natural = moment(timestamp, 'MM/DD/YYYY').format("MMMM Do, YYYY");
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "unix": unix,
        "natural": natural
    }));
});


app.listen(8080, function () {
   console.log("application is running");
});