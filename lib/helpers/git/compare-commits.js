// jshint node:true
var Git = require('nodegit');
var RSVP = require('rsvp');

/**!
  @method compareCommits

  @param {String} projectRoot the path to the project's git root
  @param {String} leading a branch or tag name ahead of trailing
  @param {String} trailing a branch or tag name behind leading
  @returns {Array} the array of commits from leading to trailing, newest first
 */
function compareCommits(projectRoot, leading, trailing) {
  return getRepository(projectRoot)
    .then(function(repository) {
      return RSVP.hash({
        leading: getReference(repository, leading),
        trailing: getReference(repository, trailing),
        repository: repository
      });
    })
    .then(function(references) {
      return RSVP.hash({
        leading: getTargetCommit(references.repository, references.leading),
        trailing: getTargetCommit(references.repository, references.trailing),
        repository: references.repository
      });
    })
    .then(function(heads) {
      return walkCommits(heads.leading, heads.trailing);
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

function getTargetCommit(repository, reference) {
  var target = reference.target();
  return Git.Commit.lookup(repository, target);
}

function getRepository(projectRoot) {
  return Git.Repository.open(projectRoot);
}

function walkCommits(from, to, arr) {
  arr = arr || [];
  arr.push(from);
  if (from.id === to.id) {
    return arr;
  }
  return from.parent()
    .then(function(parent) {
      return walkCommits(parent, to, arr);
    });
}

module.exports = compareCommits;
