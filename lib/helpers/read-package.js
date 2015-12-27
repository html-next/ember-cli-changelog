/*jshint node:true*/
'use strict';
var path = require('path');
var fs = require('fs');
var jsonFile = require('jsonfile');

module.exports = function() {
  var configPath = path.join(this.project.root, 'package.json');
  var opts;

  if (fs.existsSync(configPath)) {
    opts = jsonFile.readFileSync(configPath);
  } else {
    opts = {};
  }

  return opts;
};
