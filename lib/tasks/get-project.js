/*jshint node:true*/
'use strict';
var RSVP = require('rsvp');
var Promise = RSVP.Promise; // jshint ignore:line
var validUrl = require('valid-url');
var readPackage = require('./../helpers/read-package');
var updatePackage = require('./../helpers/update-package');

module.exports = function() {
  var pkg = readPackage.bind(this)();
  var firstStep;

  if (!pkg.repository || (typeof pkg.repository !== 'string' && !pkg.repository.url)) {
    firstStep = promptForRepoName.call(this)
      .then(function(repositoryLink) {
        updatePackage.call(this, {
          repository: repositoryLink
        });
        return repositoryLink;
      }.bind(this));
  } else {
    firstStep = Promise.resolve(pkg.repository.url || pkg.repository);
  }

  return firstStep
    .then(function(link) {
      // https://github.com/runspired/smoke-and-mirrors
      // git@github.com:runspired/smoke-and-mirrors.git
      // https://github.com/runspired/smoke-and-mirrors.git
      var parts = link.split('/');
      var project = parts.pop();
      var org = parts.pop();
      if (project.indexOf('.git') !== -1) {
        project = project.substr(0, project.indexOf('.git'));
      }
      return {
        path: link,
        organization: org,
        project,
        version: pkg.version
      };
    });
};


function promptForRepoName() {
  var promptOptions = {
    message: "Your project's package.json file has a missing or empty 'repository'\n" +
    "Please type or paste the link to the repository to continue.",
    type: 'input',
    name: 'repository'
  };

  this.ui.writeLine("");
  return this.ui.prompt(promptOptions)
    .then(function(response) {
      if (!validUrl.isUri(response.repository)) {
        this.ui.writeError('Your answer does not appear to be a URL');
        return promptForRepoName.call(this);
      }
      return response.repository;
    }.bind(this));
}
