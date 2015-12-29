/* jshint node:true */
// var RSVP = require('rsvp');
var generateChangelog = require('../lib/tasks/generate-changelog');

// For details on each option run `ember help release`
module.exports = {
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  // message: "Bumped version to %@",
  // manifest: [ 'package.json', 'bower.json', 'someconfig.json' ],
  // publish: true,
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',

  defaultBranch: 'master',
  useLocalTags: true,
  // patternForPR: '',
  // patternForCommit: '',

  beforeCommit: function(project, versions) {
    var context = {
      project: project,
      ui: project.ui
    };
    return generateChangelog.call(context)
      .then(function() {
        project.ui.prompt({
          type: 'confirm',
          name: 'answer',
          message: 'Enter "y" when you have finished making any desired modifications to CHANGELOG.md',
          choices: [
            { key: 'y', name: 'Yes, update', value: 'yes' },
            { key: 'n', name: 'No, cancel', value: 'no' }
          ]
        });
      }.bind(this));
  }
};
