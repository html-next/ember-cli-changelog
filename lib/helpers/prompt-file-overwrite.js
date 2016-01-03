// jshint node:true

var FileInfo = require('ember-cli/lib/models/file-info');

module.exports = function(config, files) {
  var info = new FileInfo({
    action: 'write',
    outputPath: files.originalPath,
    displayPath: 'CHANGELOG.md',
    inputPath: files.tmpPath,
    templateVariables: null,
    ui: this.ui
  });
  return info.confirmOverwriteTask();
};
