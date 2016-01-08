// jshint node:true
'use strict';

var prepareCommits = require('../helpers/git/prepare-commits');
var getConfig = require('../helpers/get-config');
var createUpdatedChangelog = require('../helpers/create-updated-changelog');
var promptFileOverwrite = require('../helpers/prompt-file-overwrite');
var defaultCommitFilter = require('../helpers/default-commit-filter');
var defaultCommitGroupSort = require('../helpers/default-commit-group-sort');
var defaultCommitFormatter = require('../helpers/default-commit-formatter');
var chalk = require('chalk');

module.exports = function(project, fromRev, releaseName) {
  // TODO: disambiguate this 'project' object from the ember-cli project instance
  return getConfig(project)
    .then(function(config) {
      project.ui.writeLine(
        chalk.cyan("Generating Changes between ") +
        chalk.yellow(fromRev) +
        chalk.cyan(" and ") +
        chalk.yellow(config.head) +
        chalk.cyan(" for version ") +
        chalk.yellow(releaseName));
      if (config.hostIsGithub) {
        project.ui.writeLine(chalk.yellow("Changes will only be generated based on commits" +
          " and tags already pushed to Github."));
      }

      var options = {
        user: config.organization,
        repo: config.hostIsGithub ? config.project.name : config.project.root,
        base: fromRev,
        head: config.head
      };

      return prepareCommits(options, config)

        // filter out unwanted commits
        .then(function(commits) {
          if (config.hooks.filter && typeof config.hooks.filter === 'function') {
            return commits.filter(function(commit) {
              return config.hooks.filter(commit, config); });
          }
          return commits.filter(function(commit) { return defaultCommitFilter(commit, config); });
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
        .then(createUpdatedChangelog.bind(null, project, config))

        // prompt & overwrite
        .then(promptFileOverwrite.bind(null, project, config))

        // alert finished
        .then(function(status) {
          if (status.action === 'overwrite') {
            project.ui.writeLine(chalk.cyan('CHANGELOG.md updated for ' + releaseName));
          } else {
            project.ui.writeLine(chalk.yellow('WARNING: Skipped CHANGELOG.md update for version ' + releaseName));
          }
          return true;
        })

        // catch errors
        .catch(function(err) {
          project.ui.writeError(err);
        });

    });
};
