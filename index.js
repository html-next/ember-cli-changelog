/* jshint node: true */
'use strict';

var commands = require('./lib/commands');

module.exports = {
  name: 'ember-cli-changelog',

  includedCommands: function() {
    return commands;
  }
};
