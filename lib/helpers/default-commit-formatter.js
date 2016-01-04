// jshint node:true

module.exports = function defaultCommitFormatter(config, groups) {
  groups.forEach(function(group) {
      group.commits = group.commits.map(function(commit) {
        switch (group.name) {
          case 'pull-requests':
            if (config.useGithub) {
              var link = '- [#' + commit.prNumber + '](https://github.com/' + config.project.organization + '/' +
                config.project.name + '/pull/' + commit.prNumber + ')';
              var titlePrefix = commit.type || commit.scope ? ('**' + (commit.type || '' + (commit.scope ? '(' + commit.scope + ')' : '')) + '**:') : '';
              var title = commit.title;

              var name = (commit.authorHandle.indexOf(commit.authorLogin) !== 0) ? commit.authorHandle : commit.author.name;
              var handle = (commit.authorHandle.indexOf(commit.authorLogin) !== 0) ? commit.authorHandle : commit.authorLogin;
              var author = ' *by [' + name + '](https://github.com/' + handle +')*';

              return [link, titlePrefix, title, author].join(' ');
            }
            break;
          default: // Commits
            if (config.useGithub) {
              var ref = commit.sha.substr(0, 8);

              return '- [' + ref + '](https://github.com/' + config.project.organization + '/' + config.project.name +
                '/commit/' + commit.sha + ') **' + commit.type + '(' + commit.scope + ')**: ' + commit.title +
                ' *by [' + commit.author.name + '](https://github.com/' + commit.authorHandle +')*';
            }
            break;
        }
      });
  });

  return groups;
};
