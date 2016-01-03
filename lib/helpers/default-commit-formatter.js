// jshint node:true

// TODO this is all wrong
module.exports = function defaultCommitFormatter(config, groups) {

  groups.contributions = groups.contributions.map(function(commit) {
    return '- [#' + commit.number + '](https://github.com/' + repository.organization + '/' + repository.project +
      '/pull/' + commit.number + ') **' + commit.type + '(' + commit.scope + ')**: ' + commit.title +
      '*by [' + commit.author + '](https://github.com/' + commit.authorHandle +')*';
  });

  groups.changes = groups.changes.map(function(commit) {
    var ref = commit.reference.substr(0, 8);

    return '- [' + ref + '](https://github.com/' + repository.organization + '/' + repository.project +
      '/commit/' + commit.reference + ') **' + commit.type + '(' + commit.scope + ')**: ' + commit.title +
      ' *by [' + commit.author + '](https://github.com/' + commit.authorHandle +')*';
  });

  return groups;
};
