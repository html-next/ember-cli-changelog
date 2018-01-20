module.exports = function(commit, config) {
  if (config.hostIsGithub) {
    var ref = commit.sha.substr(0, 8);

    return '- [' + ref + '](https://github.com/' + config.project.organization + '/' + config.project.name +
      '/commit/' + commit.sha + ') **' + commit.type + '(' + commit.scope + ')**: ' + commit.title +
      ' *by [' + commit.author.name + '](https://github.com/' + commit.authorHandle +')*';
  }
};
