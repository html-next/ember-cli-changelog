/*jshint node:true*/
'use strict';
var RSVP = require('rsvp');
var Promise = RSVP.Promise; // jshint ignore:line
var validUrl = require('valid-url');
var readPackage = require('./../helpers/read-package');
var updatePackage = require('./../helpers/update-package');
var getConfig = require('./get-config');

// expected repository url forms

// https://github.com/<org>/<project>
// git@github.com:<org>/<project>.git
// https://github.com/<org>/<project>.git

// https://bitbucket.org/<org>/<project>
// git@bitbucket.org:<org>/<project>.git
// https://<user>@bitbucket.org/<org>/<project>.git

// https://try.gogs.io/<org>/<project>
// git@try.gogs.io:<org>/<project>.git
// https://try.gogs.io/<org>/<project>.git


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
      var parts = link.split('/');
      var project = parts.pop();
      var org = parts.pop();
      var service = getService(link);
      if (project.indexOf('.git') !== -1) {
        project = project.substr(0, project.indexOf('.git'));
      }
      var p = {
        root: this.project.root,
        path: link,
        organization: org,
        name: project,
        project: this.project,
        version: pkg.version,
        service: service,
        projectUrl: getUrlBase(link, service, org, project),
        repositoryLink: link
      };
      var config = getConfig.call(this, p);

      config.hostIsGithub = p.service === 'github';
      config.hostIsBitbucket = p.service === 'bitbucket';
      config.hostIsCustom = p.service === 'custom';

      config.project = p;
      return config;
    }.bind(this));
};

function getService(link) {
  if (link.indexOf('github.com') !== -1) {
    return 'github';
  }
  if (link.indexOf('bitbucket.org') !== -1) {
    return 'bitbucket';
  }
  return 'custom';
}

function getUrlBase(link, service, org, project) {
  if (service === 'github') {
    return ['https://github.com', org, project].join('/');
  }

  if (service === 'bitbucket') {
    return ['https://bitbucket.org', org, project].join('/');
  }

  var base;
  if (link.indexOf('@') !== -1) {
    base = link.substring(link.indexOf('@') + 1, link.indexOf(':') - 1);
  } else if (link.indexOf('https://')) {
    base = link.substring(8, link.indexOf(org) - 2);
  } else if (link.indexOf('http://')) {
    base = link.substring(7, link.indexOf(org) - 2);
  } else {
    throw Error("Unable To Parse Custom Repository Source For Base URL");
  }

  return [base, org, project].join('/');
}


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
