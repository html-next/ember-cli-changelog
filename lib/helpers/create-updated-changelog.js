// jshint node:true
var fs = require('fs');
var path = require('path');


function insertLines(existingLines, offset, linesToInsert) {
  var insertedLineCount = 0;
  linesToInsert.forEach(function(line, index) {
    var lineNumber = offset + index;
    if (existingLines[lineNumber] !== line) {
      insertedLineCount++;
      existingLines.splice(lineNumber, 0, line);
    }
  });

  return insertedLineCount;
}

// TODO write a new file
module.export = function(config, changes) {
  var changelogPath = path.join(config.project.root, 'CHANGELOG.md');

  if (fs.existsSync(readmePath)) {
    var file = fs.readFileSync(readmePath).toString();
    var lines = file.split('\n');
    var insertedLines = 0;
    changes.forEach(function(change) {
      insertedLines += insertLines(lines, change.offset ? insertedLines + change.offset : 0, change.lines);
    });
    fs.writeFileSync(readmePath, lines.join('\n'));
  }






  return ['## ' + version, '', '### Pull Requests']
    .concat(changes.contributions)
    .concat(['', '#### Commits', ''])
    .concat(changes.changes)
    .concat(['']);
};

var changeLog = generateChangelog(repository.version, changes);

updateChangelog.call(this, [
  { offset: 3, lines: changeLog }
]);

var updateChangelog = require('../helpers/update-changelog');

function generateChangelog(version, changes) {
  return ['## ' + version, '', '### Pull Requests']
    .concat(changes.contributions)
    .concat(['', '#### Commits', ''])
    .concat(changes.changes)
    .concat(['']);
}
