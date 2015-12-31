// jshint node:true
'use strict';
var objectAssign = require('object-assign');

// based on angular style commits
// https://github.com/angular/angular.js/blob/v1.4.8/CONTRIBUTING.md#commit
module.exports = function parseCommit(info) {

  console.log('commit\n\n\n\n', info);

  var message = info.message;
  var authorHandle = info.author.login || info.author.email;
  var authorName = info.author.name;
  var commitReference = info.sha;

  message = message.trim();

  var commit = {
    type: '',
    isMerge: false,
    isRevert: false,
    typeIsStandard: false,
    scope: '',
    title: '',
    body: '',
    footer: '',
    number: '',
    reference: commitReference,
    author: authorName,
    authorHandle: authorHandle,
    message: message
  };

  var numAndAuthor, title;
  if (message.indexOf('Merge pull request #') > -1) {
    numAndAuthor = message.match(/#(\d+) from (.*)\//).slice(1, 3);
    title = message.split('\n\n')[1];

    objectAssign(commit, {
      isMerge: true,
      number: +numAndAuthor[0],
      author: authorName || numAndAuthor[1]
    }, parseMessage(title));

    return commit;
  }

  if (message.indexOf('Auto merge of #') > -1) {
    numAndAuthor = message.match(/#(\d+) - (.*):/).slice(1,3);
    title = message.split('\n\n')[1];

    objectAssign(commit, {
      isMerge: true,
      number: +numAndAuthor[0],
      author: authorName || numAndAuthor[1]
    }, parseMessage(title));

    return commit;
  }

  objectAssign(commit, parseMessage(message));

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
