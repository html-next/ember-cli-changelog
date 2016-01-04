// jshint node:true

module.exports = function defaultCommitGroupSort(commits) {
  var merges = commits.filter(function(commit) {
    return commit.isMerge;
  });
  var other = commits.filter(function(commit) {
    return !commit.isMerge && (commit.isRevert || (commit.type && commit.scope && commit.title));
  });

  var contributions = merges.sort(function(a, b) {
      return a.number > b.number;
    });

  return [
    {
      title: 'Pull Requests',
      importance: 0,
      name: 'pull-requests',
      commits: contributions
    },
    {
      title: 'Commits',
      importance: 1,
      name: 'commits',
      commits: other
    }
  ];
};
