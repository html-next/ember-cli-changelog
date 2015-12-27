// jshint node:true
'use strict';


// based on angular style commits
// https://github.com/angular/angular.js/blob/v1.4.8/CONTRIBUTING.md#commit
module.exports = function parseCommit(message) {
  var types = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'];
  var revert = 'revert:';
  var parts;
  var exp;
  message = message.trim();

  var numAndAuthor, title;
  if (message.indexOf('Merge pull request #') > -1) {
    numAndAuthor = message.match(/#(\d+) from (.*)\//).slice(1, 3);
    title = message.split('\n\n')[1];

    return {
      type: 'merge',
      typeIsStandard: false,
      scope: '',
      title: title,
      body: '',
      footer: '',
      number: +numAndAuthor[0],
      author: numAndAuthor[1],
      message: message
    };
  }

  if (message.indexOf('Auto merge of #') > -1) {
    numAndAuthor = message.match(/#(\d+) - (.*):/).slice(1,3);
    title = message.split('\n\n')[1];

    return {
      type: 'merge',
      typeIsStandard: false,
      scope: '',
      title: title,
      body: '',
      footer: '',
      number: +numAndAuthor[0],
      author: numAndAuthor[1],
      message: message
    };
  }


  if (message.indexOf(revert) === 0) {
    exp = /^revert:([^\n]*)(\n[^\n]*)?(\n[^\n]*)?/;
    parts = message.match(exp);
    return {
      type: 'revert',
      typeIsStandard: true,
      scope: '',
      title: parts[1] ? parts[1].trim() : '',
      body: parts[2] ? parts[2].trim() : '',
      footer: parts[3] ? parts[3].trim() : '',
      message: message
    };
  }

  var firstColonIndex = message.indexOf(':');
  if (firstColonIndex <= 0) {
    return {
      type: '',
      typeIsStandard: false,
      scope: '',
      title: '',
      body: '',
      footer: '',
      message: message
    };
  }
  var preTitle = message.substr(0, firstColonIndex);
  var postTitle = message.substr(firstColonIndex + 1);

  var preTitleExp = /^([^\(]+)(\(([^\)]+)\))?/;
  var postTitleExp = /^([^\n]*)(\n[^\n]*)?(\n[^\n]*)?/;

  var preTitleParts = preTitle.match(preTitleExp);
  var postTitleParts = postTitle.match(postTitleExp);

  if (!preTitleParts || !postTitleParts) {
    return {
      type: '',
      typeIsStandard: false,
      scope: '',
      title: '',
      body: '',
      footer: '',
      message: message
    };
  }

  return {
    type: preTitleParts[1],
    typeIsStandard: types.indexOf(preTitleParts[1]) !== -1,
    scope: preTitleParts[3],
    title: postTitleParts[1] ? postTitleParts[1].trim() : '',
    body: postTitleParts[2] ? postTitleParts[2].trim() : '',
    footer: postTitleParts[3] ? postTitleParts[3].trim() : '',
    message: message
  };
};
