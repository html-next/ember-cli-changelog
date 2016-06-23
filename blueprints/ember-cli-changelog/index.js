/*jshint node:true*/

var EOL = require('os').EOL;

module.exports = {
  description: 'Installs initial CHANGELOG.md file, config/release.js and ember-cli-release',

  normalizeEntityName: function() {},


  afterInstall: function() {
    var self = this;

    return this.addAddonToProject('ember-cli-release').then(function() {
      return self.insertIntoFile('config/release.js',
        'var generateChangelog = require(\'ember-cli-changelog/lib/tasks/release-with-changelog\');',
        { after: '/* jshint node:true */' + EOL })
      .then(function() {
        return self.insertIntoFile('config/release.js',
          '  beforeCommit: generateChangelog,',
          { after: 'module.exports = {' + EOL });
      });
    });
  }
};
