// jshint node:true
var Git = require('nodegit');

module.exports = function lookupTargetCommit(repository, reference) {
  var target = reference.target();
  return Git.Commit.lookup(repository, target);
};
