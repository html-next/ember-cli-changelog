// jshint node:true

// TODO this is incomplete
function massageCommit(commit) {
  console.log('\n\n\n\n', commit, '\n\n\n\n');
  return {
    author: commit.commit.author,
    authorHandle: commit.author.login,
    committer: commit.commit.committer,
    date: '',
    id: '',
    message: commit.commit.message,
    owner: '',
    sha: commit.sha,
    time: ''
  };
}

function githubMassageCommits(commits) {
  return commits.map(massageCommit);
}

module.exports = githubMassageCommits;
