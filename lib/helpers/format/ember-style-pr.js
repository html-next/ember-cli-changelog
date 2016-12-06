// jshint node:true
var getRealAuthor = require('../get-real-author');

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
    var author = getRealAuthor(commit, config);
    var titlePrefix = tags.length ? ('**[' + (tags.join(' ')) + ']**') : '';
    var title = commit.title;

    var authorText = ' *by [@' + author.handle + '](https://github.com/' + author.handle +')*';

    return [link, titlePrefix, title, authorText].join(' ');
  }
};
