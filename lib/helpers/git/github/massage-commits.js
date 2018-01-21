function massageCommit(commit, options) {
  const author = commit.commit.author;
  const authorHandle = commit.author.login;
  const committer = commit.commit.committer;
  const committerHandle = commit.committer.login;
  const message = commit.commit.message;
  const sha = commit.sha;

  //TODO: do we even need these?
  if(authorHandle) {
    options.authors[authorHandle] = author;
  }

  if(committerHandle) {
    options.authors[committerHandle] = committer;
  }

  return {
    author,
    authorHandle,
    authorLogin: authorHandle,
    committer,
    committerHandle,
    message,
    sha
  };
}

function githubMassageCommits(res, options) {
  options.authors = {};
  return res.commits.map(function(commit) { return massageCommit(commit, options); });
}

module.exports = githubMassageCommits;
