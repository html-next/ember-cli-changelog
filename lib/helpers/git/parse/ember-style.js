// jshint node:true
'use strict';
var objectAssign = require('object-assign');

// based on ember style commits
// https://github.com/emberjs/ember.js/blob/master/CONTRIBUTING.md#commit-tagging
module.exports = function parseCommit(commit) {

  // add defaults
  objectAssign(commit, {
    type: '',
    isRevert: false,
    typeIsStandard: false,
    scope: '',
    body: '',
    footer: ''
  });

  objectAssign(commit, parseMessage(commit.title));

  return commit;
};



function parseMessage(message) {
  var revert = 'revert:';
  var a;

  if (message.indexOf(revert) === 0) {
    a = {
      isRevert: true
    };
    objectAssign(a, parseMessage(message.substr(7)));
    return a;
  }

  if (message.indexOf('[WIP]') === 0) {
    a = {
      isWIP: true
    };
    objectAssign(a, parseMessage(message.substr(5)));
    return a;
  }

  if (message.indexOf('BREAKING') === 1) {
    a = {
      isBreaking: true
    };
    objectAssign(a, parseMessage('[' + message.substr(9)));
    return a;
  }

  var types = ['BUGFIX', 'FEATURE', 'ENHANCEMENT', 'INTERNAL', 'SECURITY', 'DOC', 'CLEANUP'];
  var endTitleIndex = message.indexOf(']');
  if (endTitleIndex <= 0) {
    return {};
  }
  var preTitle = message.substr(0, endTitleIndex + 1);
  var postTitle = message.substr(endTitleIndex + 1);

  var preTitleExp = /^\[([a-zA-Z]+)\s?([a-zA-Z]+)?\]/;
  var preTitleParts = preTitle.match(preTitleExp);

  if (!preTitleParts) {
    return {};
  }

  var type = preTitleParts[1].toUpperCase();
  
  return {
    type: type,
    typeIsStandard: types.indexOf(type) !== -1,
    scope: preTitleParts[2],
    title: postTitle.trim()
  };
}
