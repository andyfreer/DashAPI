var dash = require("bitcoin");

var client = new dash.Client({
   host: 'localhost',
   port: 9998,
   user: 'dashrpc',
   pass: '71PXiDZoHNfEdhdN3urucLVAUWYyzNHNeBMdkGf6483f',
   timeout: 30000
});

var EventEmitter = require('events').EventEmitter,
    ApiHandler = require('./ApiHandler');

var ApiService = module.exports = function (express) {
    var apiHandler = new ApiHandler(this);
    var self=this;

    express.get('/api/v1/getInfo', function (req, res) {

        console.log('get info called');

        client.getInfo(function(err, info, resHeaders) {
            if (err) return console.log(err);

            res.json(info);
        });

        self.emit('retrieve-info', function () {
            //res.end('info obtained);
        });
    });
};

ApiService.prototype = Object.create(EventEmitter.prototype);