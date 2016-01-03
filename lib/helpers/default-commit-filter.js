// jshint node:true

module.exports = function defaultCommitFilter(commit) {
  return commit.isMerge || commit.isRevert || (commit.type && commit.scope && commit.title);
};
