/*jshint node:true*/
'use strict';

var RSVP = require('rsvp');
var validUrl = require('valid-url');
var readPackage = require('./../helpers/read-package');
var updatePackage = require('./../helpers/update-package');
var Promise = RSVP.Promise; // jshint ignore:line

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

module.exports = function getRepoInfo(project) {
  return getRepoURL(project).then(function(link) {
    var parts = link.split('/');
    var projectName = parts.pop();
    var org = parts.pop();
    var service = getService(link);
    if (projectName.indexOf('.git') !== -1) {
      projectName = projectName.substr(0, projectName.indexOf('.git'));
    }

    return {
      path: link,
      organization: org,
      name: projectName,
      project: projectName,
      service: service,
      projectUrl: getUrlBase(link, service, org, projectName),
      repositoryLink: link
    };
  });
};

function getRepoURL(project) {
  var pkg = readPackage(project.root);

  if (!pkg.repository || (typeof pkg.repository !== 'string' && !pkg.repository.url)) {
    return promptForRepoName(project)
      .then(function(repositoryLink) {
        updatePackage(project, {
          repository: repositoryLink
        });
        return repositoryLink;
      });
  } else {
    return Promise.resolve(pkg.repository.url || pkg.repository);
  }
}

function promptForRepoName(project) {
  var promptOptions = {
    message: "Your project's package.json file has a missing or empty 'repository'\n" +
    "Please type or paste the link to the repository to continue.",
    type: 'input',
    name: 'repository'
  };

  project.ui.writeLine("");
  return project.ui.prompt(promptOptions)
    .then(function(response) {
      if (!validUrl.isUri(response.repository)) {
        project.ui.writeError('Your answer does not appear to be a URL');
        return promptForRepoName(project);
      }
      return response.repository;
    });
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

function getService(link) {
  if (link.indexOf('github.com') !== -1) {
    return 'github';
  }
  if (link.indexOf('bitbucket.org') !== -1) {
    return 'bitbucket';
  }
  return 'custom';
}
