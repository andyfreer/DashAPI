var _ = require('underscore');
var Promise = require('bluebird');

var Session = require('./models/Session');

var SessionService = function (io) {
  this.io = io;
  this.sessions = [];
};

SessionService.prototype.createSession = function (socket) {
  var self = this;
  return new Promise(function (resolve) {
    
    var session = new Session(self.io, socket);
    self.sessions.push(session);
    resolve(session.toJSON());
    
  });
};

SessionService.prototype.joinSession = function(sessionKey, displayName, socket) {
  var self = this;
  return new Promise(function (resolve, reject) {
    
    var session = _.findWhere(self.sessions, {
      sessionKey: sessionKey
    });
    
    if (session === undefined) {
      reject('This session cannot be found. Please try again.');
      return;
    }

    session.addParticipant(displayName, socket);
    resolve({
      session: session.toJSON(),
      participants: _.toArray(session.participants)
    });
    
  });
};

module.exports = SessionService;