// jshint node:true
var fs = require('fs');
var path = require('path');

module.exports = function(config, groups) {
  var changelogPath = path.join(config.project.root, 'CHANGELOG.md');
  var tmpPath = path.join(config.project.root, 'tmp/CHANGELOG-' + (new Date()).getTime() + '.md');

  var changes = generateChanges.call(this, config, groups);

  if (fs.existsSync(changelogPath)) {
    var file = fs.readFileSync(changelogPath).toString();
    var lines = file.split('\n');
    var insertedLines = 0;
    changes.forEach(function (change) {
      insertedLines += insertLines(lines, change.offset ? insertedLines + change.offset : 0, change.lines);
    });
    fs.writeFileSync(tmpPath, lines.join('\n'));
  }

  return {
    tmpPath: tmpPath,
    originalPath: changelogPath
  };
};

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

function generateChanges(config, groups) {
  var lines = ['## ' + config.version, '']
    .concat(config.hooks.beforeChanges ? config.hooks.beforeChanges : [])
    .concat([''])
    .concat(changesForGroups(groups))
    .concat([''])
    .concat(config.hooks.afterChanges ? config.hooks.afterChanges : []);

  return [{
    offset: config.updateOffset || 3,
    lines: lines
  }];
}

function changesForGroups(groups) {
  var lines = [];

  groups.forEach(function(group) {
    var importance = group.importance ? Number(group.importance) + 3 : 4;
    var importanceString = '';
    for (var i = 0; i < importance; i++) {
      importanceString += '#';
    }
    importanceString += ' ' + group.title;
    lines = lines.concat(['', importanceString, ''])
      .concat(group.commits);
  });

  return lines;
}
