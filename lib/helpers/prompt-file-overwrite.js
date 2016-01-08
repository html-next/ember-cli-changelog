// jshint node:true

var FileInfo = require('ember-cli/lib/models/file-info');
var fs = require('fs');

module.exports = function(project, config, files) {
  var info = new FileInfo({
    action: 'write',
    outputPath: files.originalPath,
    displayPath: 'CHANGELOG.md',
    inputPath: files.tmpPath,
    ui: project.ui
  });
  var task = info.confirmOverwriteTask();
  return task()
    .then(function(status) {
      if (status.action === 'overwrite') {
        fs.writeFileSync(files.originalPath, fs.readFileSync(files.tmpPath));
      }
      fs.unlinkSync(files.tmpPath);
      return status;
    });
};
