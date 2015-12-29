// jshint node:true
'use strict';

var Promise   = require('../ext/promise');  // jshint ignore:line

var generateChangelog = require('../tasks/generate-changelog');

module.exports = {
  name: 'changelog',
  aliases: ['cl', 'log'],
  description: 'Generates a changelog by comparing the current version with master.',
  works: 'insideProject',

  availableOptions: [],

  anonymousOptions: [],

  run: function() {
    return generateChangelog.call(this);
  }
};
