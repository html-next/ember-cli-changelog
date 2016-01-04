// jshint node:true
'use strict';

var prepareCommits = require('../helpers/git/prepare-commits');
var getProject = require('./get-project');
var createUpdatedChangelog = require('../helpers/create-updated-changelog');
var promptFileOverwrite = require('../helpers/prompt-file-overwrite');
var defaultCommitFilter = require('../helpers/default-commit-filter');
var defaultCommitGroupSort = require('../helpers/default-commit-group-sort');
var defaultCommitFormatter = require('../helpers/default-commit-formatter');

module.exports = function() {

  return getProject.call(this)
    .then(function(config) {

      this.ui.writeLine("Comparing " + config.base + " to " + config.head);

      var options = {
        user: config.project.organization,
        repo: config.useGithub ? config.project.name : config.project.root,
        base: config.base,
        head: config.head
      };

      return prepareCommits(options, config)

        // filter out unwanted commits
        .then(function(commits) {
          if (config.hooks.filter && typeof config.hooks.filter === 'function') {
            return commits.filter(config.hooks.filter);
          }
          return commits.filter(defaultCommitFilter);
        })

        // group commits
        .then(function(commits) {
          if (config.hooks.groupSort && typeof config.hooks.groupSort === 'function') {
            return config.hooks.groupSort(commits);
          }
          return defaultCommitGroupSort(commits);
        })

        // format commits
        .then(function(groups) {
          if (config.hooks.format && config.hooks.format === 'function') {
            return config.hooks.format(config, groups);
          }
          return defaultCommitFormatter(config, groups);
        })

        // generate a new file
        .then(createUpdatedChangelog.bind(this, config))

        // prompt & overwrite
        .then(promptFileOverwrite.bind(this, config))

        // alert finished
        .then(function(didAppendToChangelog) {
          if (didAppendToChangelog) {
            this.ui.writeLine('CHANGELOG.md update for ' + config.version.next);
          }
        }.bind(this))

        // catch errors
        .catch(function(err) {
          this.ui.writeError(err);
        }.bind(this));

    }.bind(this));
};
