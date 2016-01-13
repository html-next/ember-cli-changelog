// jshint node: true
var generateChangelog = require('./changelog');

module.exports = function(project, versions) {
  var context = {
    project: project,
    ui: project.ui,
    versions: versions
  };
  return generateChangelog.call(context)
    .then(promptForCompletion.bind(context));
};

function promptForCompletion() {
  return this.ui.prompt({
    type: 'confirm',
    name: 'answer',
    message: 'Enter "y" when you have finished making any desired modifications to CHANGELOG.md',
    choices: [
      { key: 'y', name: 'Yes, update', value: 'yes' },
      { key: 'n', name: 'No, cancel', value: 'no' }
    ]
  }).then(function(response) {
    if (!response.answer) {
      return promptForCompletion.call(this);
    }
  });
}
