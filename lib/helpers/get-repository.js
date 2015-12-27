/*jshint node:true*/
'use strict';
var RSVP = require('rsvp');
var Promise = RSVP.Promise; // jshint ignore:line
var validUrl = require('valid-url');
var readPackage = require('./read-package');
var updatePackage = require('./update-package');
var promptUser = require('./prompt');

module.exports = function() {
  var pkg = readPackage();
  var firstStep;

  if (!pkg.repository || (typeof pkg.repository !== 'string' && !pkg.repository.url)) {
    firstStep = promptForRepoName()
      .then(function(repositoryLink) {
        updatePackage({
          repository: repositoryLink
        });
        return repositoryLink;
      });
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


function promptForRepoName(context) {
  var promptOptions = {
    message: "Your project's package.json file has a missing or empty 'repository'\n" +
    "Please type or paste the link to the repository to continue.",
    type: 'input',
    name: 'repository'
  };

  console.log("\n");
  return promptUser(promptOptions)
    .then(function(response) {
      if (!validUrl.isUri(response.repository)) {
        console.log('Your answer does not appear to be a URL');
        return promptForRepoName(context);
      }
      return response.repository;
    });
}
