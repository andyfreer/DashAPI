
var EventEmitter = require('events').EventEmitter,
    sessionService = require('./SessionService');


var SocketService = module.exports = function (io) {
    io.on('connection', function (socket) {
            socket.on('create-session', function (callback) {
                sessionService.createSession(socket)
                .then(function (jsonSession) { callback(null, jsonSession); })
                .catch(function (err) { callback(err); });
            });
        });
   
};

SocketService.prototype = Object.create(EventEmitter.prototype);
