// jshint node:true
var Git = require('nodegit');
var RSVP = require('rsvp');

/**!
  @method compareCommits
  @param {String} leading a branch or tag name ahead of trailing
  @param {String} trailing a branch or tag name behind leading
  @returns {Array} the array of commits from leading to trailing, newest first
 */
function compareCommits(projectRoot, leading, trailing) {
  getRepository(projectRoot)
    .then(function(repository) {
      return RSVP.hash({
        leading: getReference(repository, leading),
        trailing: getReference(repository, trailing)
      });
    })
    .then(function(references) {
      return RSVP.hash({
        leading: getTargetCommit(references.leading),
        trailing: getTargetCommit(references.trailing)
      });
    })
    .then(function(commits) {
      // do stuff to walk parents to grab commits
    });
}

/**!
 *
 * @param repository a
 * @param branchOrTag
 * @returns {Promise}
 */
function getReference(repository, branchOrTag) {
  if (/^v?[0-9]+\.[0-9]+\.[0-9]+/.test(branchOrTag)) {
    return Git.Tag.lookup(repository, branchOrTag, Git.GIT_BRANCH_LOCAL);
  }
  if (branchOrTag.indexOf('#') === 0) {
    branchOrTag = branchOrTag.substr(1);
    return Git.Branch.lookup(repository, branchOrTag, Git.GIT_BRANCH_LOCAL);
  }
}

function getTargetCommit(reference) {

}

function getRepository(projectRoot) {
  return Git.Repository.open(projectRoot);
}

module.exports = compareCommits;
