// jshint node:true

module.exports = function defaultCommitFilter(commit, config) {
  if (config.style === 'ember') {
    var isComplete = commit.isMerge || commit.isRevert || commit.isBreaking || commit.type;
    return isComplete && ['chore'].indexOf(commit.type) === -1;
  } else if (config.style === 'angular') {
    return commit.isMerge || commit.isRevert || (commit.type && commit.scope && commit.title);
  } else {
    return commit.isMerge || commit.isRevert || (commit.type && commit.scope && commit.title);
  }
};
