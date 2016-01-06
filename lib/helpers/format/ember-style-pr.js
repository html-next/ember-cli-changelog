// jshint node:true

module.exports = function(commit, config) {
  if (config.hostIsGithub) {
    var link = '- [#' + commit.prNumber + '](https://github.com/' + config.project.organization + '/' +
      config.project.name + '/pull/' + commit.prNumber + ')';

    var tags = [];
    if (commit.isBreaking) {
      tags.push('BREAKING');
    }
    if (commit.isWIP) {
      tags.push('WIP');
    }
    if (commit.type) {
      tags.push(commit.type);
    }
    if (commit.scope) {
      tags.push(commit.scope);
    }
    var titlePrefix = tags.length ? ('**[' + (tags.join(' ')) + ']**') : '';
    var title = commit.title;

    var name = (commit.authorHandle.indexOf(commit.authorLogin) !== 0) ? commit.authorHandle : commit.author.name;
    var handle = (commit.authorHandle.indexOf(commit.authorLogin) !== 0) ? commit.authorHandle : commit.authorLogin;
    var author = ' *by [' + name + '](https://github.com/' + handle +')*';

    return [link, titlePrefix, title, author].join(' ');
  }
};
