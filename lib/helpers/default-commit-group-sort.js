// jshint node:true

// TODO this is all wrong
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

  return {
    contributions: contributions,
    changes: other
  };
};
