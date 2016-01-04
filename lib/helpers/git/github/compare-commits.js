// jshint node:true

var Promise = require('../../../ext/promise');  // jshint ignore:line
var GitHubApi = require('github');
var github = new GitHubApi({ version: '3.0.0' });
var compareCommits = Promise.denodeify(github.repos.compareCommits);
var massageGithubCommits = require('./massage-commits');

/**!
 *
 * @param options passed to the Github API compareCommits function
 * @returns {Promise} returns a promise which resolves to an array of parsed commits
 */
function githubCompareCommits(options) {
  return compareCommits(options)
    .then(massageGithubCommits);
}

module.exports = githubCompareCommits;
