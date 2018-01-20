'use strict';

var expect = require('chai').expect;
var defaultCommitGroupSort = require('../../../lib/helpers/default-commit-group-sort');

describe('default commit group sort', function () {
  it('should correctly filter other ember commit', function() {

    var commits = [{
      type: 'DOC',
      scope: 'beta',
      isStandard: true,
      title: 'update documentation'
    }, {
      type: 'DOC',
      scope: undefined,
      isStandard: true,
      title: 'update documentation'
    }];

    var orderedCommits = defaultCommitGroupSort(commits, {style: 'ember'});

    expect(orderedCommits).to.have.lengthOf(2);
    expect(orderedCommits[1].commits).to.have.lengthOf(2);
  });

  it('should correctly filter other angular commits', function() {

    var commits = [{
      type: 'docs',
      scope: 'beta',
      isStandard: true,
      title: 'update documentation'
    }, {
      type: 'docs',
      scope: undefined,
      isStandard: true,
      title: 'update documentation'
    }];

    var orderedCommits = defaultCommitGroupSort(commits, {style: 'angular'});

    expect(orderedCommits).to.have.lengthOf(2);
    expect(orderedCommits[1].commits).to.have.lengthOf(1);
  });

});
