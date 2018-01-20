function massageCommit(commit, options) {
  options.authors[commit.author.login] = commit.commit.author;
  options.authors[commit.committer.login] = commit.commit.committer;
  return {
    author: commit.commit.author,
    authorHandle: commit.author.login,
    authorLogin: commit.author.login,
    committer: commit.commit.committer,
    committerHandle: commit.committer.login,
    message: commit.commit.message,
    sha: commit.sha
  };
}

function githubMassageCommits(res, options) {
  options.authors = {};
  return res.commits.map(function(commit) { return massageCommit(commit, options); });
}

module.exports = githubMassageCommits;
