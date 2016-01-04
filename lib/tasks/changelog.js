// jshint node:true
'use strict';

var prepareCommits = require('../helpers/git/prepare-commits');
var getProject = require('./get-project');
var createUpdatedChangelog = require('../helpers/create-updated-changelog');
var promptFileOverwrite = require('../helpers/prompt-file-overwrite');
var defaultCommitFilter = require('../helpers/default-commit-filter');
var defaultCommitGroupSort = require('../helpers/default-commit-group-sort');
var defaultCommitFormatter = require('../helpers/default-commit-formatter');
var chalk = require('chalk');

module.exports = function() {
  return getProject.call(this)
    .then(function(config) {
      this.ui.writeLine(
        chalk.cyan("Generating Changes between ") +
        chalk.yellow(config.base) +
        chalk.cyan(" and ") +
        chalk.yellow(config.head) +
        chalk.cyan(" for version ") +
        chalk.yellow(config.versions.next));
      if (config.useGithub) {
        this.ui.writeLine(chalk.yellow("Changes will only be generated based on commits" +
          " and tags already pushed to Github."));
      }

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
        .then(function(status) {
          if (status.action === 'overwrite') {
            this.ui.writeLine(chalk.cyan('CHANGELOG.md updated for ' + config.versions.next));
          } else {
            this.ui.writeLine(chalk.yellow('WARNING: Skipped CHANGELOG.md update for version ' + config.versions.next));
          }
          return true;
        }.bind(this))

        // catch errors
        .catch(function(err) {
          this.ui.writeError(err);
        }.bind(this));

    }.bind(this));
};
