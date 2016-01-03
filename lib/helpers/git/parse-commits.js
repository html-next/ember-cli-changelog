// jshint node:true

var parseAngularStyle = require('./parse/angular-style');
var parseEmberStyle = require('./parse/ember-style');
var accountForPR = require('./parse/helpers/account-for-pr');

function parseCommits(commits, options) {
  commits = commits.map(accountForPR);

  if (options.hooks.parser && typeof options.hooks.parser === 'function') {
    return commits.map(options.hooks.parser);
  }
  if (options.style === 'ember') {
    return commits.map(parseEmberStyle);
  }
  return commits.map(parseAngularStyle);
}

module.exports = parseCommits;
