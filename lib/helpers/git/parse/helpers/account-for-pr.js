// jshint node:true
'use strict';
var objectAssign = require('object-assign');

function accountForPR(commit) {
  var prNumber, title;
  var message = commit.message.trim();
  if (message.indexOf('Merge pull request #') > -1) {
    prNumber = message.match(/#(\d+)/).slice(1, 3);
    title = message.split('\n\n')[1];

    objectAssign(commit, {
      isMerge: true,
      prNumber: +prNumber[0],
      title: title,
      authorHandle: commit.authorHandle
    });

    return commit;
  }

  if (message.indexOf('Auto merge of #') > -1) {
    prNumber = message.match(/#(\d+)/).slice(1,3);
    title = message.split('\n\n')[1];

    objectAssign(commit, {
      isMerge: true,
      prNumber: +prNumber[0],
      authorHandle: commit.authorHandle,
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
