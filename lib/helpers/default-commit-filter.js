// jshint node:true

module.exports = function defaultCommitFilter(commit, config) {
  var isComplete;
  if (config.style === 'ember') {
    isComplete = commit.isMerge || commit.isRevert || commit.isBreaking || commit.type;
    return isComplete && ['task', 'chore'].indexOf(commit.type.toLowerCase()) === -1;
  } else if (config.style === 'angular') {
    isComplete = commit.isMerge || commit.isRevert || (commit.type && commit.scope && commit.title);
    return isComplete && ['task', 'chore'].indexOf(commit.type) === -1;
  } else {
    isComplete = commit.isMerge || commit.isRevert || (commit.type && commit.scope && commit.title);
    return isComplete && ['task', 'chore'].indexOf(commit.type) === -1;
  }
};
