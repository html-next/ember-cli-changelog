// jshint node:true
'use strict';

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var objectAssign = require('object-assign');
var readPackage = require('./read-package');
var getRepoInfo = require('./get-repo-info');

// Returns a config object augmented with user defined config options
module.exports = function getConfig(project) {
  var pkg = readPackage(project.root);
  var config = {
    root: project.root,
    version: pkg.version,
  };

  return getRepoInfo(project)
    .then(function(repoInfo) {
      // Add repo info to the config object
      objectAssign(config, repoInfo);

      config.hostIsGithub = repoInfo.service === 'github';
      config.hostIsBitbucket = repoInfo.service === 'bitbucket';
      config.hostIsCustom = repoInfo.service === 'custom';

      return readConfig(project);
    }).then(function(userConfig) {
      // Add user config options to the config object
      objectAssign(config, userConfig);

      return config;
    });
};

function readConfig(project) {
  if (project._changelogConfig) {
    return project._changelogConfig;
  }
  var configPath = path.join(project.root, 'config/changelog.js');
  var config = {};

  if (fs.existsSync(configPath)) {
    config = require(configPath);
    project._changelogConfig = config;

    if (!config.head) {
      config.head = 'master';
    }

    return config;
  }

  throw "Error: config/changelog.js is not defined. You may need to run `ember g ember-cli-changelog`.";
}
