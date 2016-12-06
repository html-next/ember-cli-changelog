// jshint node:true

module.exports = function(commit, config) {
  if (config.hostIsGithub) {
    var ref = commit.sha.substr(0, 8);

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
    var titlePrefix = tags.length ? ('**[' + (tags.join(' ')) + ']** ') : '';

    return '- [' + ref + '](https://github.com/' + config.project.organization + '/' + config.project.name +
      '/commit/' + commit.sha + ') ' + titlePrefix + commit.title +
      ' *by [@' + commit.authorHandle + '](https://github.com/' + commit.authorHandle +')*';
  }
};
