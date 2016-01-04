// jshint node:true
'use strict';
var objectAssign = require('object-assign');

function accountForPR(commit) {
  var numAndAuthor, title;
  var message = commit.message.trim();
  if (message.indexOf('Merge pull request #') > -1) {
    numAndAuthor = message.match(/#(\d+) from (.*)\//).slice(1, 3);
    title = message.split('\n\n')[1];

    objectAssign(commit, {
      isMerge: true,
      prNumber: +numAndAuthor[0],
      title: title,
      authorHandle: numAndAuthor[1]
    });

    return commit;
  }

  if (message.indexOf('Auto merge of #') > -1) {
    numAndAuthor = message.match(/#(\d+) - (.*):/).slice(1,3);
    title = message.split('\n\n')[1];

    objectAssign(commit, {
      isMerge: true,
      prNumber: +numAndAuthor[0],
      authorHandle: numAndAuthor[1],
      title: title
    });

    return commit;
  }

  objectAssign(commit, {
    isMerge:  false,
    prNumber: false,
    title: message
  });

  return commit;
}

module.exports = accountForPR;
