// jshint node:true

module.exports = function defaultCommitGroupSort(commits, config) {
  var merges = commits.filter(function(commit) {
    return commit.isMerge;
  });

  var other = commits.filter(function(commit) {
    var isValidCommit = commit.type && commit.title;

    if (config.style !== 'ember') {
      isValidCommit = isValidCommit && commit.scope;
    }

    return !commit.isMerge && (commit.isRevert || isValidCommit);
  });

  merges.sort(function(a, b) {
    return a.number > b.number;
  });

  other.reverse();

  return [
    {
      title: 'Pull Requests',
      importance: 1,
      name: 'pull-requests',
      commits: merges
    },
    {
      title: 'Commits',
      importance: 2,
      name: 'commits',
      commits: other
    }
  ];
};
