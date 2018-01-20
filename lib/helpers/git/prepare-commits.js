var gitCompare = require('./git/compare-commits');
var githubCompare = require('./github/compare-commits');
var parseCommits = require('./parse-commits');

function prepareCommits(options, parseOptions) {
  return (parseOptions.hostIsGithub ? githubCompare(options, parseOptions) : gitCompare(options))
    .then(function(commits) {
      return parseCommits(commits, parseOptions);
    });
}

module.exports = prepareCommits;
