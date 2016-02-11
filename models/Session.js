var _ = require('underscore');
var async = require('async');
var base64id = require('base64id');


var Session = function (io, hostSocket) {
  this.io = io;
  this.hostSocket = hostSocket;

  this.sessionKey = base64id.generateId();
  this.participants = {};
  this.votes = {};

  this.hostSocket.join(this.sessionKey);

  var onDisconnect = _.bind(function() {
    this.getRoom().emit('host-left');
  }, this);

  this.hostSocket.on('disconnect', onDisconnect);

};

Session.prototype.addParticipant = function (displayName, socket) {
  var participant = {
    id: socket.id,
    displayName: displayName
  };

  socket.join(this.sessionKey);
  this.participants[socket.id] = participant;
  this.getRoom().emit('participant-joined', participant);

  var onDisconnect = _.bind(function() {
    delete this.participants[socket.id];
    this.getRoom().emit('participant-left', participant.id);
  }, this);

  socket.on('disconnect', onDisconnect);
};

Session.prototype.getRoom = function () {
  return this.io.sockets.in(this.sessionKey);
};

Session.prototype.toJSON = function () {
  return {
    key: this.sessionKey
  };
};

module.exports = Session;