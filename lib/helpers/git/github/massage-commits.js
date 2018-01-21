function massageCommit(commit, options) {
  const author = commit.commit.author;
  // Have to guard against null authors here
  const authorHandle = commit.author ? commit.author.login : null;
  const committer = commit.commit.committer;
  const committerHandle = commit.committer ? commit.committer.login : null;
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
