// jshint node:true
'use strict';

var SilentError = require('silent-error');
var chalk = require('chalk');
var generateChangelog = require('../tasks/changelog');

module.exports = {
  name: 'changelog',
  aliases: ['cl', 'log'],
  description: 'Generates a changelog by comparing the current version with master.',
  works: 'insideProject',

  availableOptions: [],

  anonymousOptions: [
    '<from-rev>',
    '<release-name>',
  ],

  run: function(options, rawArgs) {
    var fromRev = rawArgs.shift();
    var releaseName = rawArgs.shift();

    if (!fromRev) {
      throw new SilentError("Changelog generation requires a valid starting git revision.");
    }

    if (!releaseName) {
      throw new SilentError("Changelog generation requires specifying the name of the release.");
    }

    return generateChangelog(this.project, fromRev, releaseName);
  }
};
