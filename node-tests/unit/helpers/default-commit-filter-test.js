/* jshint node:true */

'use strict';

var expect = require('chai').expect;
var defaultCommitFilter = require('../../../lib/helpers/default-commit-filter');

describe('default commit filter', function () {

  /* ember style */

  it('should correctly include valid ember commit', function() {

    var commit = {
      type: 'DOC',
      scope: 'beta',
      isStandard: true,
      title: 'update documentation'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'ember'});
    expect(isCommitIncluded).to.be.true;
  });

  it('should correctly ignore defaultly excluded ember commit types', function() {

    var commit = {
      type: 'TASK',
      scope: 'beta',
      isStandard: true,
      title: 'some task'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'ember'});
    expect(isCommitIncluded).to.be.false;

    commit.type = 'CHORE';
    isCommitIncluded = defaultCommitFilter(commit, {style: 'ember'});
    expect(isCommitIncluded).to.be.false;
  });

  it('should correctly ignore custom excluded ember commit types', function() {

    var commit = {
      type: 'TASK',
      scope: 'beta',
      isStandard: true,
      title: 'some task'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'ember', ignore: []});
    expect(isCommitIncluded).to.be.true;

    commit.type = 'DOC';
    isCommitIncluded = defaultCommitFilter(commit, {style: 'ember', ignore: ['DOC']});
    expect(isCommitIncluded).to.be.false;

    commit.type = 'TOOLING';
    commit.isStandard = false;
    isCommitIncluded = defaultCommitFilter(commit, {style: 'ember', ignore: ['DOC', 'TOOLING']});
    expect(isCommitIncluded).to.be.false;
  });

  /* angular style */

  it('should correctly include valid angular commit', function() {

    var commit = {
      type: 'docs',
      scope: 'beta',
      isStandard: true,
      title: 'update documentation'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'angular'});

    expect(isCommitIncluded).to.be.true;
  });

  it('should correctly ignore defaultly excluded angular commit types', function() {

    var commit = {
      type: 'task',
      scope: 'beta',
      isStandard: true,
      title: 'some task'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'angular'});
    expect(isCommitIncluded).to.be.false;

    commit.type = 'chore';
    isCommitIncluded = defaultCommitFilter(commit, {style: 'angular'});
    expect(isCommitIncluded).to.be.false;
  });

  it('should correctly ignore custom excluded angular commit types', function() {

    var commit = {
      type: 'task',
      scope: 'beta',
      isStandard: true,
      title: 'some task'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'angular', ignore: []});
    expect(isCommitIncluded).to.be.true;

    commit.type = 'docs';
    isCommitIncluded = defaultCommitFilter(commit, {style: 'angular', ignore: ['docs']});
    expect(isCommitIncluded).to.be.false;

    commit.type = 'tooling';
    commit.isStandard = false;
    isCommitIncluded = defaultCommitFilter(commit, {style: 'angular', ignore: ['doc', 'tooling']});
    expect(isCommitIncluded).to.be.false;
  });

  /* jquery style */

  it('should correctly include valid angular commit', function() {

    var commit = {
      type: 'docs',
      scope: 'beta',
      isStandard: true,
      title: 'update documentation'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'jquery'});

    expect(isCommitIncluded).to.be.true;
  });

  it('should correctly ignore excluded defaultly jquery commit types', function() {

    var commit = {
      type: 'task',
      scope: 'beta',
      isStandard: true,
      title: 'some task'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'jquery'});
    expect(isCommitIncluded).to.be.false;

    commit.type = 'chore';
    isCommitIncluded = defaultCommitFilter(commit, {style: 'jquery'});
    expect(isCommitIncluded).to.be.false;
  });

  it('should correctly ignore custom excluded jquery commit types', function() {

    var commit = {
      type: 'task',
      scope: 'beta',
      isStandard: true,
      title: 'some task'
    }; 

    var isCommitIncluded = defaultCommitFilter(commit, {style: 'jquery', ignore: []});
    expect(isCommitIncluded).to.be.true;

    commit.type = 'docs';
    isCommitIncluded = defaultCommitFilter(commit, {style: 'jquery', ignore: ['docs']});
    expect(isCommitIncluded).to.be.false;

    commit.type = 'tooling';
    commit.isStandard = false;
    isCommitIncluded = defaultCommitFilter(commit, {style: 'jquery', ignore: ['doc', 'tooling']});
    expect(isCommitIncluded).to.be.false;
  });
 
});