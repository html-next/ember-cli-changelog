var angularStyleCommit = require('./format/angular-style-commit');
var emberStyleCommit = require('./format/ember-style-commit');
var angularStylePR = require('./format/angular-style-pr');
var emberStylePR = require('./format/ember-style-pr');

module.exports = function defaultCommitFormatter(config, groups) {
  groups.forEach(function(group) {
      group.commits = group.commits.map(function(commit) {
        switch (group.name) {
          case 'pull-requests':
              switch (config.style) {
                case 'ember':
                  return emberStylePR(commit, config);
                case 'angular':
                  return angularStylePR(commit, config);
                case 'jquery':
                  return angularStylePR(commit, config);
                default:
                  return angularStylePR(commit, config);
              }
            break;
          default: // Commits
            switch (config.style) {
              case 'ember':
                return emberStyleCommit(commit, config);
              case 'angular':
                return angularStyleCommit(commit, config);
              case 'jquery':
                return angularStyleCommit(commit, config);
              default:
                return angularStyleCommit(commit, config);
            }
            break;
        }
      });
  });

  return groups;
};
