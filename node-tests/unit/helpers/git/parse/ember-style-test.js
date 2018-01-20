/* jshint node:true */

'use strict';

var expect = require('chai').expect;
var parseCommit = require('../../../../../lib/helpers/git/parse/ember-style');

describe('ember parse', function () {
  it('should correctly parse standard commit', function() {
    var parsed = parseCommit({ title: "[DOC beta] Update documentation"});

    expect(parsed.type).to.equal("DOC");
    expect(parsed.typeIsStandard).to.be.true;
    expect(parsed.scope).to.be.equal("beta");
    expect(parsed.title).to.be.equal("Update documentation");
  });

  it('should correctly parse non standard commit', function() {
    var parsed = parseCommit({ title: "[UNKNOWN beta] Update unknown"});

    expect(parsed.type).to.equal("UNKNOWN");
    expect(parsed.typeIsStandard).to.be.false;
    expect(parsed.scope).to.be.equal("beta");
    expect(parsed.title).to.be.equal("Update unknown");
  });


  it('should correctly parse non scoped commit', function() {
    var parsed = parseCommit({ title: "[DOC] Update documentation"});

    expect(parsed.type).to.equal("DOC");
    expect(parsed.typeIsStandard).to.be.true;
    expect(parsed.scope).to.be.undefined;
    expect(parsed.title).to.be.equal("Update documentation");
  });
});