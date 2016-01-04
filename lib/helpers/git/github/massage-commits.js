// jshint node:true

function massageCommit(commit) {
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

function githubMassageCommits(res) {
  return res.commits.map(massageCommit);
}

module.exports = githubMassageCommits;
