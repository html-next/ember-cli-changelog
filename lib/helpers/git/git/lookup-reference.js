'use strict';

// var Git = require('nodegit');
var RSVP = require('rsvp');
var Git = {
  Branch: {
    lookup: function() {
      return RSVP.Promise.reject("nodegit needs replaced");
    },
    BRANCH: {
      LOCAL: false,
      REMOTE: false
    }
  }
};

/**!
 *
 * @param repository a
 * @param branchOrTag
 * @returns {Promise}
 */
module.exports = function lookupReference(repository, branchOrTag) {
  if (/^v?[0-9]+\.[0-9]+\.[0-9]+/.test(branchOrTag)) {
    return Git.Branch.lookup(repository, branchOrTag, Git.Branch.BRANCH.LOCAL);
  }
  if (branchOrTag.indexOf('#') === 0) {
    branchOrTag = branchOrTag.substr(1);
  }
  return Git.Branch.lookup(repository, branchOrTag, branchType(branchOrTag));
};

function branchType(name) {
  return name.indexOf('origin/') === 0 || name.indexOf('upstream/') === 0 ?
    Git.Branch.BRANCH.REMOTE : Git.Branch.BRANCH.LOCAL;
}
