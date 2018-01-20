module.exports = function commitInfo(ref) {
  return {
    author: ref.author(),
    committer: ref.committer(),
    date: ref.date(),
    id: ref.id().tostrS(),
    message: ref.message(),
    owner: ref.owner(),
    sha: ref.sha(),
    time: ref.time()
  };
};
