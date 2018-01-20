'use strict';

var generateChangelog = require('../tasks/changelog');

module.exports = {
  name: 'changelog',
  aliases: ['cl', 'log'],
  description: 'Generates a changelog by comparing the current version with master.',
  works: 'insideProject',

  availableOptions: [],

  anonymousOptions: [],

  run() {
    return generateChangelog.call(this);
  }
};
