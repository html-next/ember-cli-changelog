// jshint node:true
'use strict';

var compareCommits = require('../helpers/git/compare-commits');

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

module.exports = function() {
  return getRepo.call(this)
    .then(function(repository) {
      return compareCommits({
        project: this.project.root,
        base: 'origin/master', //'v' + repository.version,
        head: 'master'
      }).then(function(res) {
        var commits = res.map(parseCommit);
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
      }.bind(this)).then(function(changes) {
        var changeLog = generateChangelog(repository.version, changes);

        updateChangelog.call(this, [
          { offset: 3, lines: changeLog }
        ]);
        this.ui.writeLine('Check CHANGELOG.md for new entries related to ' + repository.version);
      }.bind(this)).catch(function(err) {
        this.ui.writeError(err);
      }.bind(this));
    }.bind(this));
};
