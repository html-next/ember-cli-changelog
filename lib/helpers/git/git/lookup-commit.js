// jshint node:true
// var Git = require('nodegit');
var RSVP = require('rsvp');
var Git = {
  Commit: {
    lookup: function() {
      return RSVP.Promise.reject("nodegit needs replaced");
    }
  }
};

module.exports = function lookupTargetCommit(repository, reference) {
  var target = reference.target();
  return Git.Commit.lookup(repository, target);
};
