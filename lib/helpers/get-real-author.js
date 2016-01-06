// jshint node:true

module.exports = function getRealAuthor(commit, config) {
  var author = {
    name: commit.author.name,
    handle: commit.authorHandle
  };

  // the author detected in the PR does not match the commit's specified author
  if (commit.authorHandle.indexOf(commit.authorLogin) !== 0) {
    author.name = (config.authors && config.authors[commit.authorHandle]) ?
      config.authors[commit.authorHandle].name : commit.authorHandle;
  }

  return author;
};
