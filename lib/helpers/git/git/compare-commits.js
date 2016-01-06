// jshint node:true
var RSVP = require('rsvp');
var Git = require('nodegit');
var getRepository = require('./lookup-repository');
var getReference = require('./lookup-reference');
var getTargetCommit = require('./lookup-commit');
var getCommitInfo = require('./commit-info');

function assert(message, value) {
  if (!value) {
    throw Error(message);
  }
}

/**!
  @method compareCommits

  @param {String} projectRoot the path to the project's git root
  @param {String} leading a branch or tag name ahead of trailing
  @param {String} trailing a branch or tag name behind leading
  @returns {Array} the array of commits from leading to trailing, newest first
 */
function compareCommits(options) {
  assert("You MUST include 'project' in the options passed to compareCommits." +
    "It should be the path to the project's git root.", options.project);
  assert("You MUST include 'base' in the options passed to compareCommits. " +
    "It should be either a branch name or tag name.", options.base);
  assert("You MUST include 'head' in the options passed to compareCommits. " +
    "It should be either a branch name or tag name.", options.head);
  assert("Branch or Tag names passed to compareCommit via 'options.head' must be strings.",
    typeof options.head === 'string');
  assert("Branch or Tag names passed to compareCommit via 'options.base' must be strings.",
    typeof options.base === 'string');

  return getRepository(options.project)
    .then(function(repository) {
      return RSVP.hash({
        head: getReference(repository, options.head),
        base: getReference(repository, options.base),
        repository: repository
      });
    })
    .then(function(references) {
      return RSVP.hash({
        head: getTargetCommit(references.repository, references.head),
        base: getTargetCommit(references.repository, references.base),
        repository: references.repository
      });
    })
    .then(function(heads) {
      return walkCommits(heads.repository, heads.head, heads.base);
    });
}


function walkCommits(repository, from, to, arr) {
  arr = arr || [];
  arr.push(getCommitInfo(from));
  if (from.id().equal(to.id())) {
    return RSVP.Promise.resolve(arr);
  }

  var parentId = from.parentId(0);
  if (!parentId) {
    throw Error("Commit " + to.id() + " is not a parent of " + arr[0].id);
  }

  return Git.Commit.lookup(repository, parentId)
    .then(function(parent) {
      return walkCommits(repository, parent, to, arr);
    });
}

module.exports = compareCommits;
