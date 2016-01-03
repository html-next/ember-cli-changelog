// jshint node:true
'use strict';
var objectAssign = require('object-assign');

// based on angular style commits
// https://github.com/angular/angular.js/blob/v1.4.8/CONTRIBUTING.md#commit
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

  if (message.indexOf(revert) === 0) {
    var a = {
      isRevert: true
    };
    objectAssign(a, parseMessage(message.substr(7)));
    return a;
  }

  var types = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert'];
  var firstColonIndex = message.indexOf(':');
  if (firstColonIndex <= 0) {
    return {};
  }
  var preTitle = message.substr(0, firstColonIndex);
  var postTitle = message.substr(firstColonIndex + 1);

  var preTitleExp = /^([^\(]+)(\(([^\)]+)\))?/;
  var postTitleExp = /^([^\n]*)(\n[^\n]*)?(\n[^\n]*)?/;

  var preTitleParts = preTitle.match(preTitleExp);
  var postTitleParts = postTitle.match(postTitleExp);

  if (!preTitleParts || !postTitleParts) {
    return {};
  }

  var type = preTitleParts[1].toLowerCase();

  return {
    type: type,
    typeIsStandard: types.indexOf(type) !== -1,
    scope: preTitleParts[3],
    title: postTitleParts[1] ? postTitleParts[1].trim() : '',
    body: postTitleParts[2] ? postTitleParts[2].trim() : '',
    footer: postTitleParts[3] ? postTitleParts[3].trim() : ''
  };
}
