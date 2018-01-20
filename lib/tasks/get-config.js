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
      config.versions.last = config.versions.latest;

      config.base = this.versions.latest;
      config.head = 'master'; // TODO branch detection

    // directly invoked
    } else {
      config.versions = {
        last: 'v' + project.version,
        next: 'v' + project.version
      };

      if (!config.base || config.base === '-last') {
        config.base = 'v' + project.version;
      }

      if (!config.head) {
        config.head = 'master';
      }

    }

    return config;
  }

  this.ui.writeLine(chalk.red("Error: config/changelog.js is not defined. You may need to run `ember g ember-cli-changelog`."));
  process.exit(1);
};
