// jshint node:true
var getRealAuthor = require('../get-real-author');

module.exports = function(commit, config) {
  if (config.hostIsGithub) {
    var link = '- [#' + commit.prNumber + '](https://github.com/' + config.project.organization + '/' +
      config.project.name + '/pull/' + commit.prNumber + ')';
    var titlePrefix = commit.type || commit.scope ? ('**' + (commit.type || '' + (commit.scope ? '(' + commit.scope + ')' : '')) + '**:') : '';
    var title = commit.title;

    var author = getRealAuthor(commit, config);
    var authorText = ' *by [@' + author.handle + '](https://github.com/' + author.handle +')*';

    return [link, titlePrefix, title, authorText].join(' ');
  }
};
