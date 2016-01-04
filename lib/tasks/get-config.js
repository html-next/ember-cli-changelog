// jshint node:true
'use strict';

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

module.exports = function(project) {
  if (this._changelogConfig) {
    return this._changelogConfig;
  }
  var configPath = path.join(this.project.root, 'config/changelog.js');
  var config = {};

  if (fs.existsSync(configPath)) {
    config = require(configPath);
    this._changelogConfig = config;

    // invoked via another task such as "release"
    if (this.versions) {
      config.versions = this.versions;

      config.base = 'v' + this.versions.last;
      config.head = 'master'; // TODO branch detection

      if (!config.hasOwnProperty('useGithub')) {
        config.useGithub = true;
      }

    // directly invoked
    } else {
      config.versions = {
        last: project.version,
        next: project.version
      };

      if (!config.base || config.base === '-last') {
        config.base = 'v' + project.version;
      }

      if (!config.head) {
        config.head = 'master';
      }

      if (!config.hasOwnProperty('useGithub')) {
        config.useGithub = true;
      }

    }

    return config;
  }

  this.ui.writeLine(chalk.red("Error: config/changelog.js is not defined. You may need to run `ember g ember-cli-changelog`."));
  process.exit(1);
};
