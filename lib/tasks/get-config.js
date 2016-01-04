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

    if (!config.base || config.base === '-last') {
      config.base = project.version;
    }

    if (!config.head) {
      config.head = 'master';
    }

    if (!config.hasOwnProperty('useGithub')) {
      config.useGithub = true;
    }

    return config;
  }

  this.ui.writeLine(chalk.red("Error: config/changelog.js is not defined. You may need to run `ember g ember-cli-changelog`."));
  process.exit(1);
};
