// jshint node:true

module.exports = function defaultCommitFormatter(config, groups) {
  groups.forEach(function(group) {
      group.commits = group.commits.map(function(commit) {
        switch (group.name) {
          case 'pull-requests':
            if (config.useGithub) {
              return '- [#' + commit.number + '](https://github.com/' + config.project.organization + '/' +
                config.project.name + '/pull/' + commit.number + ') **' + commit.type + '(' + commit.scope + ')**: ' +
                commit.title + '*by [' + commit.author + '](https://github.com/' + commit.authorHandle +')*';
            }
            break;
          default: // Commits
            if (config.useGithub) {
              var ref = commit.sha.substr(0, 8);

              return '- [' + ref + '](https://github.com/' + config.project.organization + '/' + config.project.project +
                '/commit/' + commit.sha + ') **' + commit.type + '(' + commit.scope + ')**: ' + commit.title +
                ' *by [' + commit.author + '](https://github.com/' + commit.authorHandle +')*';
            }
            break;
        }
      });
  });

  return groups;
};
