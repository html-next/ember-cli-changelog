// jshint node:true

module.exports = function(commit, config) {
  if (config.hostIsGithub) {
    var link = '- [#' + commit.prNumber + '](https://github.com/' + config.project.organization + '/' +
      config.project.name + '/pull/' + commit.prNumber + ')';
    var titlePrefix = commit.type || commit.scope ? ('**' + (commit.type || '' + (commit.scope ? '(' + commit.scope + ')' : '')) + '**:') : '';
    var title = commit.title;

    var name = (commit.authorHandle.indexOf(commit.authorLogin) !== 0) ? commit.authorHandle : commit.author.name;
    var handle = (commit.authorHandle.indexOf(commit.authorLogin) !== 0) ? commit.authorHandle : commit.authorLogin;
    var author = ' *by [' + name + '](https://github.com/' + handle +')*';

    return [link, titlePrefix, title, author].join(' ');
  }
};
