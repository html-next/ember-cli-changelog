/*jshint node:true*/
'use strict';

var EOL       = require('os').EOL;
var multiline = require('multiline');
var Promise   = require('../ext/promise');  // jshint ignore:line
var GitHubApi = require('github');

var github         = new GitHubApi({ version: '3.0.0' });
var compareCommits = Promise.denodeify(github.repos.compareCommits);
var parseCommit = require('../helpers/parse-commit');
var getRepo = require('../helpers/get-repository');
var updateChangelog = require('../helpers/update-changelog');

function generateChangelog(version, changes) {
  return ['## ' + version, '', '### Pull Requests']
    .concat(changes.contributions)
    .concat(['', '#### Commits', ''])
    .concat(changes.changes)
    .concat(['']);
}

module.exports = {
  name: 'changelog',
  aliases: ['cl', 'log'],
  description: 'Generates a changelog by comparing the current version with master.',
  works: 'insideProject',

  availableOptions: [],

  anonymousOptions: [],

  run: function(options, rawArgs) {debugger;
    var _this = this;
    getRepo()
      .then(function(repository) {
        compareCommits({
          user: repository.organization,
          repo: repository.project,
          base: 'v' + repository.version,
          head: 'master'
        }).then(function(res) {
          // console.log('Response', res);
          var commits = res.commits.map(parseCommit);
          var merges = commits.filter(function(commit) {
            // TODO allow hooks into this filter
            return commit.isMerge;
          });
          var other = commits.filter(function(commit) {
            // TODO allow hooks into this filter
            return commit.isRevert || (commit.type && commit.scope && commit.title);
          });

          var contributions = merges.sort(function(a, b) {
              return a.number > b.number;
            })
            .map(function(commit) {
              return '- [#' + commit.number + '](https://github.com/' + repository.organization + '/' + repository.project +
                '/pull/' + commit.number + ') **' + commit.type + '(' + commit.scope + ')**: ' + commit.title +
                '*by [' + commit.author + '](https://github.com/' + commit.authorHandle +')*';
            });

          var changes = other.map(function(commit) {
            var ref = commit.reference.substr(0, 8);

            return '- [' + ref + '](https://github.com/' + repository.organization + '/' + repository.project +
            '/commit/' + commit.reference + ') **' + commit.type + '(' + commit.scope + ')**: ' + commit.title +
              ' *by [' + commit.author + '](https://github.com/' + commit.authorHandle +')*';
          });

          return {
            contributions: contributions,
            changes: changes
          };

        }).then(function(changes) {

          var changeLog = generateChangelog(repository.version, changes);
          updateChangelog.call(_this, [
            { offset: 3, lines: changeLog }
          ]);

        }).catch(function(err) {
          console.error(err);
        });
      });
  }
};
